import { finds } from "@agusmgarcia/react-essentials-utils";
import { type FirebaseApp, initializeApp } from "firebase/app";
import {
  type Auth as FirebaseAuth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  FieldPath,
  type Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  runTransaction,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 as createUUID } from "uuid";

import unknown from "#public/assets/unknown.webp";
import { arrays } from "#src/utils";

import { CloudinaryClient } from "../CloudinaryClient";
import {
  type ApproveMatchRequest,
  type ApproveMatchResponse,
  type CreateLeagueRequest,
  type CreateLeagueResponse,
  type CreateMatchRequest,
  type CreateMatchResponse,
  type GetLeagueRequest,
  type GetLeagueResponse,
  type GetLeaguesRequest,
  type GetLeaguesResponse,
  type GetMatchesRequest,
  type GetMatchesResponse,
  type GetProfileRequest,
  type GetProfileResponse,
  type GetUserRequest,
  type GetUserResponse,
  type GetUsersRequest,
  type GetUsersResponse,
  type LoginRequest,
  type LoginResponse,
  type LogoutRequest,
  type LogoutResponse,
  type PlayerColor,
  type RejectMatchRequest,
  type RejectMatchResponse,
} from "./CatanClient.types";

export default class CatanClient {
  static readonly INSTANCE: CatanClient = new CatanClient();

  private static readonly COLLECTIONS = {
    leagues: "leagues",
    matches: "matches",
    users: "users",
  };

  private readonly app: FirebaseApp;
  private readonly auth: FirebaseAuth;
  private readonly googleAuthProvider: GoogleAuthProvider;
  private readonly db: Firestore;

  private constructor() {
    this.app = initializeApp({
      apiKey: "AIzaSyAPhOeJZQbI9H5TSbY-DOEDE1QQR3yETrc",
      appId: "1:368937227014:web:fcc4dd49c4d8401c020487",
      authDomain: "next-catan-the-league.firebaseapp.com",
      messagingSenderId: "368937227014",
      projectId: "next-catan-the-league",
      storageBucket: "next-catan-the-league.firebasestorage.app",
    });

    this.auth = getAuth(this.app);
    this.googleAuthProvider = new GoogleAuthProvider();
    this.db = getFirestore(this.app);
  }

  async getLeagues(
    { userId }: GetLeaguesRequest,
    _: AbortSignal,
  ): Promise<GetLeaguesResponse> {
    if (!userId) return [];

    return getDocs(
      query(
        collection(this.db, CatanClient.COLLECTIONS.leagues),
        where("deletedAt", "==", null),
        where("playerIds", "array-contains", userId),
      ),
    ).then((leaguesDoc) =>
      leaguesDoc.docs.map((d) => ({
        ...CatanClient.transformLeague(d.data()),
        id: d.id,
      })),
    );
  }

  async getLeague(
    { id }: GetLeagueRequest,
    signal: AbortSignal,
  ): Promise<GetLeagueResponse> {
    if (!id) return undefined;

    const leagueDoc = await getDoc(
      doc(this.db, CatanClient.COLLECTIONS.leagues, id),
    );

    signal.throwIfAborted();
    if (!leagueDoc.exists()) return undefined;

    const data = leagueDoc.data();
    if (!!data.deletedAt) return undefined;

    return {
      ...CatanClient.transformLeague(data),
      id: leagueDoc.id,
    };
  }

  async createLeague(
    { matchesCount, name, players }: CreateLeagueRequest,
    _: AbortSignal,
  ): Promise<CreateLeagueResponse> {
    const now = Date.now();

    const document = await addDoc(
      collection(this.db, CatanClient.COLLECTIONS.leagues),
      {
        createdAt: now,
        deletedAt: null,
        matchesCount,
        name,
        playerAdmins: players.reduce(
          (result, player) => {
            result[player.id] = player.admin;
            return result;
          },
          {} as Record<string, boolean>,
        ),
        playerColors: players.reduce(
          (result, player) => {
            result[player.id] = player.color;
            return result;
          },
          {} as Record<string, PlayerColor>,
        ),
        playerIds: players.map((p) => p.id),
        updatedAt: now,
      },
    );

    return document.id;
  }

  private static transformLeague(
    data: any,
  ): Omit<NonNullable<GetLeagueResponse>, "id"> {
    return {
      createdAt: data?.createdAt || 0,
      matchesCount: data?.matchesCount || 0,
      name: data?.name || "",
      players:
        data?.playerIds?.map((playerId: string) => ({
          admin: !!data?.playerAdmins?.[playerId],
          color: data?.playerColors?.[playerId] || "blue",
          id: playerId,
        })) || [],
      updatedAt: data?.updatedAt || 0,
    };
  }

  async getMatches(
    { userId }: GetMatchesRequest,
    _: AbortSignal,
  ): Promise<GetMatchesResponse> {
    if (!userId) return [];

    return await getDocs(
      query(
        collection(this.db, CatanClient.COLLECTIONS.matches),
        where("deletedAt", "==", null),
        where("playerIds", "array-contains", userId),
      ),
    ).then((matchesDoc) =>
      matchesDoc.docs.map((d) => ({
        ...CatanClient.transformMatch(d.data()),
        id: d.id,
      })),
    );
  }

  async createMatch(
    { leagueId, observations, photoURL, players, winnerId }: CreateMatchRequest,
    signal: AbortSignal,
  ): Promise<CreateMatchResponse> {
    const now = Date.now();
    await addDoc(collection(this.db, CatanClient.COLLECTIONS.matches), {
      createdAt: now,
      deletedAt: null,
      leagueId,
      observations: observations || null,
      photoURL: !!photoURL
        ? await CloudinaryClient.INSTANCE.uploadImage({ url: photoURL }, signal)
        : null,
      playerApproveds: players.reduce(
        (result, p) => {
          result[p.id] = p.approved || null;
          return result;
        },
        {} as Record<string, boolean | null>,
      ),
      playerIds: players.map((p) => p.id),
      playerPoints: players.reduce(
        (result, p) => {
          result[p.id] = p.points;
          return result;
        },
        {} as Record<string, number>,
      ),
      updatedAt: now,
      winnerId,
    });
  }

  async approveMatch(
    { id, userId }: ApproveMatchRequest,
    _: AbortSignal,
  ): Promise<ApproveMatchResponse> {
    if (!userId) return;

    await updateDoc(
      doc(this.db, CatanClient.COLLECTIONS.matches, id),
      new FieldPath("playerApproveds", userId),
      true,
      new FieldPath("updatedAt"),
      Date.now(),
    );
  }

  async rejectMatch(
    { id, userId }: RejectMatchRequest,
    _: AbortSignal,
  ): Promise<RejectMatchResponse> {
    if (!userId) return;

    await updateDoc(
      doc(this.db, CatanClient.COLLECTIONS.matches, id),
      new FieldPath("playerApproveds", userId),
      false,
      new FieldPath("updatedAt"),
      Date.now(),
    );
  }

  private static transformMatch(
    data: any,
  ): Omit<GetMatchesResponse[number], "id"> {
    return {
      createdAt: data?.createdAt || 0,
      leagueId: data?.leagueId || "",
      observations: data?.observations || undefined,
      photoBlurURL: !!data?.photoURL
        ? CloudinaryClient.INSTANCE.getBlurImage({ url: data.photoURL })
        : undefined,
      photoURL: data?.photoURL || undefined,
      players:
        data?.playerIds.map((playerId: string) => ({
          approved:
            typeof data.playerApproveds?.[playerId] === "boolean"
              ? data.playerApproveds[playerId]
              : undefined,
          id: playerId,
          points: data?.playerPoints?.[playerId] || 0,
        })) || [],
      updatedAt: data?.updatedAt || 0,
      winnerId: data?.winnerId || "",
    };
  }

  async getUsers(
    { userId }: GetUsersRequest,
    _: AbortSignal,
  ): Promise<GetUsersResponse> {
    if (!userId) return [];

    return await getDocs(
      query(
        collection(this.db, CatanClient.COLLECTIONS.users),
        where("deletedAt", "==", null),
      ),
    ).then((userDocs) =>
      userDocs.docs.map((userDoc) => ({
        ...CatanClient.transformUser(userDoc.data()),
        id: userDoc.id,
      })),
    );
  }

  async getUser(
    {}: GetUserRequest,
    signal: AbortSignal,
  ): Promise<GetUserResponse> {
    await this.auth.authStateReady();
    signal.throwIfAborted();

    const user = this.auth.currentUser;
    if (!user?.email) return undefined;

    const userDoc = await getDoc(
      doc(this.db, CatanClient.COLLECTIONS.users, user.email),
    );
    if (!userDoc.exists()) return undefined;

    const data = userDoc.data();
    if (!!data.deletedAt) return undefined;

    return { ...CatanClient.transformUser(data), id: userDoc.id };
  }

  async login({}: LoginRequest, signal: AbortSignal): Promise<LoginResponse> {
    const { user } = await signInWithPopup(this.auth, this.googleAuthProvider);
    if (!user.email) throw new Error("User without email is not valid");

    const userRef = doc(this.db, CatanClient.COLLECTIONS.users, user.email);

    await runTransaction(this.db, async (transaction) => {
      signal.throwIfAborted();

      const userDoc = await transaction.get(userRef);
      signal.throwIfAborted();

      if (!!userDoc.exists()) {
        const data = userDoc.data();

        if (!!data.deletedAt) {
          const now = Date.now();
          transaction.update(userRef, { deletedAt: null, updatedAt: now });

          return {
            ...CatanClient.transformUser({ ...data, updatedAt: now }),
            id: userDoc.id,
          };
        }

        return { ...CatanClient.transformUser(data), id: userDoc.id };
      }

      const now = Date.now();
      const newUser: Omit<NonNullable<GetUserResponse>, "id"> = {
        createdAt: now,
        defaultColor: "blue",
        name: user.displayName || "Unknown",
        photoURL: user.photoURL || unknown.src,
        profileId: createUUID(),
        updatedAt: now,
      };

      transaction.set(userRef, { ...newUser, deletedAt: null });
      return { ...newUser, id: user.email };
    });
  }

  async logout({}: LogoutRequest, _: AbortSignal): Promise<LogoutResponse> {
    await signOut(this.auth);
  }

  private static transformUser(
    data: any,
  ): Omit<NonNullable<GetUserResponse>, "id"> {
    return {
      createdAt: data?.createdAt || 0,
      defaultColor: data?.defaultColor || "blue",
      name: data?.name || "",
      photoURL: data?.photoURL || "",
      profileId: data?.profileId || "",
      updatedAt: data?.updatedAt || 0,
    };
  }

  async getProfile(
    { id }: GetProfileRequest,
    signal: AbortSignal,
  ): Promise<GetProfileResponse> {
    if (!id) return undefined;

    const userId = await getDocs(
      query(
        collection(this.db, CatanClient.COLLECTIONS.users),
        where("deletedAt", "==", null),
        where("profileId", "==", id),
      ),
    )
      .then((userDocs) =>
        userDocs.docs.map((userDoc) => ({
          ...CatanClient.transformUser(userDoc.data()),
          id: userDoc.id,
        })),
      )
      .then((users) => users.find(finds.singleOrDefault))
      .then((user) => user?.id);

    if (!userId) return undefined;

    return await Promise.all([
      this.getLeagues({ userId }, signal).then((leagues) =>
        leagues.reduce(
          (result, l) => {
            result[l.id] = l;
            return result;
          },
          {} as Record<string, GetLeaguesResponse[number]>,
        ),
      ),
      this.getMatches({ userId }, signal).then((matches) =>
        matches.filter((m) => m.players.every((p) => !!p.approved)),
      ),
    ]).then(([rawLeagues, matches]) => {
      const leagues = arrays
        .groupBy(matches, (m) => m.leagueId)
        .map((group) => {
          const league = rawLeagues[group.group];
          if (!league) return undefined;

          return {
            id: league.id,
            winnerId:
              group.values.length >= league.matchesCount
                ? arrays
                    .countOccurrences(group.values.map((m) => m.winnerId))
                    .find(finds.first)?.item
                : undefined,
          };
        })
        .filter((l) => !!l);

      return {
        activeLeaguesCount: leagues.filter((l) => !l.winnerId).length,
        completedLeaguesCount: leagues.filter((l) => !!l.winnerId).length,
        id,
        leaguesWinCount: leagues.filter((l) => l.winnerId === userId).length,
        matchesCount: matches.length,
        totalPoints: matches
          .map((m) => m.players.find((p) => p.id === userId)?.points || 0)
          .reduce((result, points) => result + points, 0),
        victoriesCount: matches.filter((m) => m.winnerId === userId).length,
      };
    });
  }
}
