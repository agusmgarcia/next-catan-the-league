import { ServerSlice } from "@agusmgarcia/react-essentials-store";

import { CatanClient, type CatanClientTypes } from "#src/clients";

import { type UsersSlice } from "../UsersSlice";
import { type Request, type Response } from "./UserSlice.types";

export default class UserSlice extends ServerSlice<
  Response,
  Request,
  { users: UsersSlice }
> {
  constructor() {
    super(undefined);
  }

  protected override onRequestBuild(): Request {
    return {};
  }

  protected override onFetch(
    request: Request,
    signal: AbortSignal,
  ): Promise<Response> {
    return CatanClient.INSTANCE.getUser(request, signal);
  }

  async login(signal: AbortSignal): Promise<void> {
    await CatanClient.INSTANCE.login({}, signal);
    await this.reload(signal);
  }

  async logout(signal: AbortSignal): Promise<void> {
    await CatanClient.INSTANCE.logout({}, signal);
    await this.reload(signal);
  }

  async update(
    user: CatanClientTypes.UpdateUserRequest,
    signal: AbortSignal,
  ): Promise<void> {
    await CatanClient.INSTANCE.updateUser(user, signal);
    await this.reload(signal);
    await this.slices.users.reload(signal);
  }
}
