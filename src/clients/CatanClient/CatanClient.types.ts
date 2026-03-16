type PlayerColor = "blue" | "brown" | "green" | "orange" | "red" | "white";

export type GetLeaguesRequest = {
  userId: string;
};

export type GetLeaguesResponse = Pick<
  NonNullable<GetLeagueResponse>,
  "createdAt" | "id" | "matchesCount" | "name" | "players" | "updatedAt"
>[];

export type GetLeagueRequest = {
  id: string;
};

export type GetLeagueResponse =
  | {
      createdAt: number;
      id: string;
      matchesCount: number;
      name: string;
      players: {
        admin: boolean;
        color: PlayerColor;
        id: string;
      }[];
      updatedAt: number;
    }
  | undefined;

export type CreateLeagueRequest = Pick<
  NonNullable<GetLeagueResponse>,
  "matchesCount" | "name" | "players"
>;

export type CreateLeagueResponse = string;

export type GetMatchesRequest = {
  userId: string;
};

export type GetMatchesResponse = {
  createdAt: number;
  id: string;
  leagueId: string;
  observations: string | undefined;
  photoURL: string | undefined;
  players: {
    approved: boolean | undefined;
    id: string;
    points: number;
  }[];
  updatedAt: number;
  winnerId: string;
}[];

export type CreateMatchRequest = Pick<
  GetMatchesResponse[number],
  "leagueId" | "observations" | "photoURL" | "players" | "winnerId"
>;

export type CreateMatchResponse = void;

export type ApproveMatchRequest = {
  id: string;
  userId: string;
};

export type ApproveMatchResponse = void;

export type RejectMatchRequest = {
  id: string;
  userId: string;
};

export type RejectMatchResponse = void;

export type GetUsersRequest = {
  userId: string;
};

export type GetUsersResponse = Pick<
  NonNullable<GetUserResponse>,
  | "createdAt"
  | "defaultColor"
  | "id"
  | "name"
  | "photoURL"
  | "profileId"
  | "updatedAt"
>[];

export type GetUserRequest = {};

export type GetUserResponse =
  | {
      createdAt: number;
      defaultColor: PlayerColor;
      id: string;
      name: string;
      photoURL: string;
      profileId: string;
      updatedAt: number;
    }
  | undefined;

export type LoginRequest = {};

export type LoginResponse = void;

export type LogoutRequest = {};

export type LogoutResponse = void;

export type UpdateUserRequest = {
  id: string;
} & Pick<NonNullable<GetUserResponse>, "photoURL">;

export type UpdateUserResponse = void;

export type GetProfileRequest = {
  id: string;
};

export type GetProfileResponse =
  | {
      activeLeaguesCount: number;
      completedLeaguesCount: number;
      id: string;
      leaguesWinCount: number;
      matchesCount: number;
      totalPoints: number;
      victoriesCount: number;
    }
  | undefined;
