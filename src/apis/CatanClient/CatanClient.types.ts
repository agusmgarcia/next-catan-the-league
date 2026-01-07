export type PlayerColor =
  | "blue"
  | "brown"
  | "green"
  | "orange"
  | "red"
  | "white";

export type GetLeaguesRequest = {
  userId: string;
};

export type GetLeaguesResponse = Pick<
  NonNullable<GetLeagueResponse>,
  "completedAt" | "createdAt" | "id" | "name" | "players" | "updatedAt"
>[];

export type GetLeagueRequest = {
  id: string;
};

export type GetLeagueResponse =
  | {
      completedAt: number | undefined;
      createdAt: number;
      id: string;
      name: string;
      players: {
        admin: boolean;
        color: PlayerColor;
        id: string;
        name: string; // TODO: remove it
        photoURL: string; // TODO: remove it
        victoryPoints: number; // TODO: remove it
      }[];
      updatedAt: number;
    }
  | undefined;

export type GetUsersRequest = {
  userId: string;
};

export type GetUsersResponse = Pick<
  NonNullable<GetUserResponse>,
  | "createdAt"
  | "defaultColor"
  | "email"
  | "id"
  | "name"
  | "photoURL"
  | "updatedAt"
>[];

export type GetUserRequest = {};

export type GetUserResponse =
  | {
      createdAt: number;
      defaultColor: PlayerColor;
      email: string | undefined;
      id: string;
      name: string;
      photoURL: string;
      updatedAt: number;
    }
  | undefined;

export type LoginRequest = {};

export type LoginResponse = void;

export type LogoutRequest = {};

export type LogoutResponse = void;
