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
  type Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  runTransaction,
  updateDoc,
  where,
} from "firebase/firestore";

import unknown from "#public/assets/unknown.webp";

import {
  type ApproveMatchRequest,
  type ApproveMatchResponse,
  type CreateMatchRequest,
  type CreateMatchResponse,
  type GetLeagueRequest,
  type GetLeagueResponse,
  type GetLeaguesRequest,
  type GetLeaguesResponse,
  type GetMatchesRequest,
  type GetMatchesResponse,
  type GetUserRequest,
  type GetUserResponse,
  type GetUsersRequest,
  type GetUsersResponse,
  type LoginRequest,
  type LoginResponse,
  type LogoutRequest,
  type LogoutResponse,
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

  private static readonly MAX_IN_ELEMENTS = 30;

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

  private static transformLeague(
    data: any,
  ): Omit<NonNullable<GetLeagueResponse>, "id"> {
    return {
      completedAt: data?.completedAt || undefined,
      createdAt: data?.createdAt || 0,
      name: data?.name || "",
      players:
        data?.playerIds?.map((playerId: string) => ({
          admin: !!data?.players[playerId]?.admin,
          color: data?.players[playerId]?.color || "blue",
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
    { leagueId, observations, players, winnerId }: CreateMatchRequest,
    _: AbortSignal,
  ): Promise<CreateMatchResponse> {
    const now = Date.now();

    await addDoc(collection(this.db, CatanClient.COLLECTIONS.matches), {
      createdAt: now,
      deletedAt: null,
      leagueId,
      observations,
      photoURL: null, //TODO:
      playerIds: players.map((p) => p.id),
      players: players.reduce(
        (result, p) => {
          result[p.id] = {
            approved: p.approved || null,
            points: p.points,
          };
          return result;
        },
        {} as Record<string, { approved: boolean | null; points: number }>,
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

    await updateDoc(doc(this.db, CatanClient.COLLECTIONS.matches, id), {
      [`players.${userId}.approved`]: true,
      updatedAt: Date.now(),
    });
  }

  async rejectMatch(
    { id, userId }: RejectMatchRequest,
    _: AbortSignal,
  ): Promise<RejectMatchResponse> {
    if (!userId) return;

    await updateDoc(doc(this.db, CatanClient.COLLECTIONS.matches, id), {
      [`players.${userId}.approved`]: false,
      updatedAt: Date.now(),
    });
  }

  private static transformMatch(
    data: any,
  ): Omit<GetMatchesResponse[number], "id"> {
    return {
      createdAt: data?.createdAt || 0,
      leagueId: data?.leagueId || "",
      observations: data?.observations || "",
      photoURL: data?.photoURL || undefined,
      players:
        Object.keys(data?.players || {}).map((playerId: string) => ({
          approved:
            typeof data.players[playerId].approved === "boolean"
              ? data.players[playerId].approved
              : undefined,
          id: playerId,
          points: data?.players[playerId].points || 0,
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
    if (!user) return undefined;

    const userDoc = await getDoc(
      doc(this.db, CatanClient.COLLECTIONS.users, user.uid),
    );
    if (!userDoc.exists()) return undefined;

    const data = userDoc.data();
    if (!!data.deletedAt) return undefined;

    return { ...CatanClient.transformUser(data), id: userDoc.id };
  }

  async login({}: LoginRequest, signal: AbortSignal): Promise<LoginResponse> {
    const { user } = await signInWithPopup(this.auth, this.googleAuthProvider);

    const userRef = doc(this.db, CatanClient.COLLECTIONS.users, user.uid);

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

      if (!user.email) throw new Error("User without email is not valid");

      const now = Date.now();
      const newUser: Omit<NonNullable<GetUserResponse>, "id"> = {
        createdAt: now,
        defaultColor: "blue",
        email: user.email,
        name: user.displayName || "Unknown",
        photoURL: user.photoURL || unknown.src,
        updatedAt: now,
      };

      transaction.set(userRef, { ...newUser, deletedAt: null });
      return { ...newUser, id: user.uid };
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
      email: data?.email || "",
      name: data?.name || "",
      photoURL: data?.photoURL || "",
      updatedAt: data?.updatedAt || 0,
    };
  }
}
