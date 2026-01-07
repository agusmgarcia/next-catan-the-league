import { ServerSlice } from "@agusmgarcia/react-essentials-store";

import { CatanClient } from "#src/apis";

import { type LeagueIdSlice } from "../LeagueIdSlice";
import { type Request, type Response } from "./MatchesSlice.types";

export default class MatchesSlice extends ServerSlice<
  Response,
  Request,
  { leagueId: LeagueIdSlice }
> {
  constructor() {
    super([]);
  }

  protected override onRequestBuild(): Request {
    return { leagueId: this.slices.leagueId.response || "" };
  }

  protected override onFetch(
    request: Request,
    signal: AbortSignal,
  ): Promise<Response> {
    return CatanClient.INSTANCE.getMatches(request, signal);
  }
}
