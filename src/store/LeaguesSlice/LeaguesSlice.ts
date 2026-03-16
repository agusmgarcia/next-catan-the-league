import { ServerSlice } from "@agusmgarcia/react-essentials-store";

import { CatanClient, type CatanClientTypes } from "#src/clients";

import { type UserSlice } from "../UserSlice";
import { type Request, type Response } from "./LeaguesSlice.types";

export default class LeaguesSlice extends ServerSlice<
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
    return CatanClient.INSTANCE.getLeagues(request, signal);
  }

  async createLeague(
    request: CatanClientTypes.CreateLeagueRequest,
    signal: AbortSignal,
  ): Promise<string> {
    const leagueId = await CatanClient.INSTANCE.createLeague(request, signal);
    await this.reload(signal);
    return leagueId;
  }
}
