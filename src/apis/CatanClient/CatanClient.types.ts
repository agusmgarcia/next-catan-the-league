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
