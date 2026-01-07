export type GetLeaguesRequest = {
  userId: string;
};

export type GetLeaguesResponse = {
  completedAt: number | undefined;
  id: string;
}[];

export type GetLeagueRequest = {
  id: string;
};

export type GetLeagueResponse =
  | {
      completedAt: number | undefined;
      id: string;
      name: string;
      players: {
        color: "blue" | "brown" | "green" | "orange" | "red" | "white";
        id: string;
        name: string;
        photoURL: string;
        victoryPoints: number;
      }[];
    }
  | undefined;

export type GetUserRequest = {};

export type GetUserResponse =
  | {
      email: string;
      id: string;
      name: string;
      photoURL: string;
    }
  | undefined;

export type LoginRequest = {};

export type LoginResponse = void;

export type LogoutRequest = {};

export type LogoutResponse = void;
