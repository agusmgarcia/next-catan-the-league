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
        color: PlayerColor;
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
      color: PlayerColor;
      email: string | undefined;
      id: string;
      name: string;
      photoURL: string;
    }
  | undefined;

export type LoginRequest = {};

export type LoginResponse = void;

export type LogoutRequest = {};

export type LogoutResponse = void;
