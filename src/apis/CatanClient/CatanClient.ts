import { delay, filters } from "@agusmgarcia/react-essentials-utils";
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
        where("players.ids", "array-contains", userId),
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
    _: AbortSignal,
  ): Promise<GetLeagueResponse> {
    // TODO: fetch from the database.
    await delay(100);

    if (id !== "league-2026") return undefined;

    return {
      completedAt: undefined,
      createdAt: Date.now(),
      id: "league-2026",
      name: "Catan League 2026",
      players: [
        {
          admin: false,
          color: "red",
          id: "user1",
          name: "Ricardo Fort",
          photoURL: unknown.src,
          victoryPoints: 60,
        },
        {
          admin: false,
          color: "white",
          id: "user2",
          name: "Flavio Mendoza",
          photoURL: unknown.src,
          victoryPoints: 32,
        },
        {
          admin: true,
          color: "blue",
          id: "user3",
          name: "Angela Torres",
          photoURL: unknown.src,
          victoryPoints: 16,
        },
        {
          admin: false,
          color: "orange",
          id: "user4",
          name: "Carla Peterson",
          photoURL: unknown.src,
          victoryPoints: 8,
        },
        {
          admin: false,
          color: "green",
          id: "user5",
          name: "Diego Peretti",
          photoURL: unknown.src,
          victoryPoints: 3,
        },
        {
          admin: false,
          color: "brown",
          id: "user6",
          name: "Emilia Attias",
          photoURL: unknown.src,
          victoryPoints: 1,
        },
      ],
      updatedAt: Date.now(),
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
        data?.players?.ids?.map((playerId: string, index: number) => ({
          admin: !!data?.players?.admins?.at(index),
          color: data?.players?.colors?.at(index) || "blue",
          id: playerId,
          name: "Unknown", // TODO: remove it.
          photoURL: unknown.src, // TODO: remove it.
          victoryPoints: 0, // TODO: remove it.
        })) || [],
      updatedAt: data?.updatedAt || 0,
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
