import { ServerSlice } from "@agusmgarcia/react-essentials-store";

import { CatanClient, type CatanClientTypes } from "#src/clients";

import { type UserSlice } from "../UserSlice";
import { type Request, type Response } from "./MatchesSlice.types";

export default class MatchesSlice extends ServerSlice<
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
    return CatanClient.INSTANCE.getMatches(request, signal);
  }

  async createMatch(
    request: CatanClientTypes.CreateMatchRequest,
    signal: AbortSignal,
  ): Promise<void> {
    await CatanClient.INSTANCE.createMatch(request, signal);
    await this.reload(signal);
  }

  async approveMatch(id: string, signal: AbortSignal): Promise<void> {
    const userId = this.slices.user.response?.id || "";
    await CatanClient.INSTANCE.approveMatch({ id, userId }, signal);
    await this.reload(signal);
  }

  async rejectMatch(id: string, signal: AbortSignal): Promise<void> {
    const userId = this.slices.user.response?.id || "";
    await CatanClient.INSTANCE.rejectMatch({ id, userId }, signal);
    await this.reload(signal);
  }
}
