import { ServerSlice } from "@agusmgarcia/react-essentials-store";

import { CatanClient } from "#src/apis";

import { type Request, type Response } from "./UserSlice.types";

export default class UserSlice extends ServerSlice<Response, Request> {
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
}
