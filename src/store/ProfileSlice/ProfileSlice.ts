import { ServerSlice } from "@agusmgarcia/react-essentials-store";

import { CatanClient } from "#src/apis";

import { type Request, type Response } from "./ProfileSlice.types";

export default class ProfileSlice extends ServerSlice<Response, Request> {
  constructor() {
    super(undefined);
  }

  protected override onFetch(
    request: Request,
    signal: AbortSignal,
  ): Promise<Response> {
    return CatanClient.INSTANCE.getProfile(request, signal);
  }

  async setId(id: string | undefined, signal: AbortSignal): Promise<void> {
    await this.reloadWithRequest({ id: id || "" }, signal);
  }
}
