import { delay } from "@agusmgarcia/react-essentials-utils";
import { type FirebaseApp, initializeApp } from "firebase/app";
import {
  type Auth as FirebaseAuth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import unknown from "#public/assets/unknown.webp";

import {
  type GetLeagueRequest,
  type GetLeagueResponse,
  type GetLeaguesRequest,
  type GetLeaguesResponse,
  type GetUserRequest,
  type GetUserResponse,
  type LoginRequest,
  type LoginResponse,
  type LogoutRequest,
  type LogoutResponse,
} from "./CatanClient.types";

export default class CatanClient {
  static readonly INSTANCE: CatanClient = new CatanClient();

  private readonly app: FirebaseApp;
  private readonly auth: FirebaseAuth;
  private readonly googleAuthProvider: GoogleAuthProvider;

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
  }

  async getLeagues(
    { userId }: GetLeaguesRequest,
    _: AbortSignal,
  ): Promise<GetLeaguesResponse> {
    if (!userId) return [];

    // TODO: fetch from the database.
    await delay(200);
    return [
      {
        completedAt: undefined,
        id: "league-2026",
      },
    ];
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
      name: "Catan League 2026",
      players: [
        {
          color: "red",
          id: "user1",
          name: "Ricardo Fort",
          photoURL: unknown.src,
          victoryPoints: 60,
        },
        {
          color: "white",
          id: "user2",
          name: "Flavio Mendoza",
          photoURL: unknown.src,
          victoryPoints: 32,
        },
        {
          color: "blue",
          id: "user3",
          name: "Angela Torres",
          photoURL: unknown.src,
          victoryPoints: 16,
        },
        {
          color: "orange",
          id: "user4",
          name: "Carla Peterson",
          photoURL: unknown.src,
          victoryPoints: 8,
        },
        {
          color: "green",
          id: "user5",
          name: "Diego Peretti",
          photoURL: unknown.src,
          victoryPoints: 3,
        },
        {
          color: "brown",
          id: "user6",
          name: "Emilia Attias",
          photoURL: unknown.src,
          victoryPoints: 1,
        },
      ],
    };
  }

  async getUser(
    {}: GetUserRequest,
    signal: AbortSignal,
  ): Promise<GetUserResponse> {
    await this.auth.authStateReady();
    signal.throwIfAborted();

    const user = this.auth.currentUser;
    if (!user) return undefined;

    return {
      email: user.email || "",
      id: user.uid,
      name: user.displayName || "Unknown",
      photoURL: user.photoURL || unknown.src,
    };
  }

  async login({}: LoginRequest, _: AbortSignal): Promise<LoginResponse> {
    await signInWithPopup(this.auth, this.googleAuthProvider);
  }

  async logout({}: LogoutRequest, _: AbortSignal): Promise<LogoutResponse> {
    await signOut(this.auth);
  }
}
