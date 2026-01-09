import { filters } from "@agusmgarcia/react-essentials-utils";
import { type FirebaseApp, initializeApp } from "firebase/app";
import {
  type Auth as FirebaseAuth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  documentId,
  type Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  runTransaction,
  where,
} from "firebase/firestore";

import unknown from "#public/assets/unknown.webp";
import { splitArrays } from "#src/utils";

import {
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
    return getDocs(
      query(
        collection(this.db, CatanClient.COLLECTIONS.leagues),
        where("deletedAt", "==", null),
        where("playerIds", "array-contains", userId),
      ),
    ).then((result) =>
      result.docs.map((d) => ({
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
      name: data?.name || "Unnamed",
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
    { leagueId }: GetMatchesRequest,
    _: AbortSignal,
  ): Promise<GetMatchesResponse> {
    return await getDocs(
      query(
        collection(this.db, CatanClient.COLLECTIONS.matches),
        where("deletedAt", "==", null),
        where("leagueId", "==", leagueId),
      ),
    ).then((docs) =>
      docs.docs.map((d) => ({
        ...CatanClient.transformMatch(d.data()),
        id: d.id,
      })),
    );
  }

  private static transformMatch(
    data: any,
  ): Omit<GetMatchesResponse[number], "id"> {
    return {
      createdAt: data?.createdAt || 0,
      leagueId: data?.leagueId || "",
      players:
        Object.keys(data?.players || {}).map((playerId: string) => ({
          approval: !!data.players[playerId].approval,
          id: playerId,
          points: data?.players[playerId].points || 0,
        })) || [],
      updatedAt: data?.updatedAt || "",
    };
  }

  async getUsers(
    { userId }: GetUsersRequest,
    signal: AbortSignal,
  ): Promise<GetUsersResponse> {
    return await this.getLeagues({ userId }, signal)
      .then((leagues) => leagues.flatMap((l) => l.players.map((p) => p.id)))
      .then((userIds) => userIds.filter(filters.distinct))
      .then((userIds) =>
        userIds.reduce(...splitArrays<string>(CatanClient.MAX_IN_ELEMENTS)),
      )
      .then((groupsOfUserIds) =>
        groupsOfUserIds.map((userIds) =>
          getDocs(
            query(
              collection(this.db, CatanClient.COLLECTIONS.users),
              where(documentId(), "in", userIds),
            ),
          ),
        ),
      )
      .then((groupOfUsersDocPromises) => Promise.all(groupOfUsersDocPromises))
      .then((groupOfUsersDoc) => groupOfUsersDoc.flatMap((doc) => doc.docs))
      .then((userDocs) =>
        userDocs.map((userDoc) => ({
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

    const userRef = doc(this.db, CatanClient.COLLECTIONS.users, user.uid);

    return await runTransaction(this.db, async (transaction) => {
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
        email: user.email || undefined,
        name: user.displayName || "Unknown",
        photoURL: user.photoURL || unknown.src,
        updatedAt: now,
      };

      transaction.set(userRef, { ...newUser, email: newUser.email || null });
      return { ...newUser, id: user.uid };
    });
  }

  private static transformUser(
    data: any,
  ): Omit<NonNullable<GetUserResponse>, "id"> {
    return {
      createdAt: data?.createdAt || 0,
      defaultColor: data?.defaultColor || "blue",
      email: data?.email || undefined,
      name: data?.name || "Unknown",
      photoURL: data?.photoURL || unknown.src,
      updatedAt: data?.updatedAt || 0,
    };
  }

  async login({}: LoginRequest, _: AbortSignal): Promise<LoginResponse> {
    await signInWithPopup(this.auth, this.googleAuthProvider);
  }

  async logout({}: LogoutRequest, _: AbortSignal): Promise<LogoutResponse> {
    await signOut(this.auth);
  }
}
