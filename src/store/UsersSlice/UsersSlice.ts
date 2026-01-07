import { ServerSlice } from "@agusmgarcia/react-essentials-store";

import { CatanClient } from "#src/apis";

import { type UserSlice } from "../UserSlice";
import { type Request, type Response } from "./UsersSlice.types";

export default class UsersSlice extends ServerSlice<
  Response,
  Request,
  { user: UserSlice }
> {
  constructor() {
    super([]);
  }

  protected override onRequestBuild(): Request {
    return { userId: this.slices.user.response?.id || "" };
  }

  protected override onFetch(
    request: Request,
    signal: AbortSignal,
  ): Promise<Response> {
    return CatanClient.INSTANCE.getUsers(request, signal);
  }
}
