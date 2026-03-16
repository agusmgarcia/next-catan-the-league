import { ServerSlice } from "@agusmgarcia/react-essentials-store";

import { CatanClient } from "#src/clients";

import { type LeagueIdSlice } from "../LeagueIdSlice";
import { type Request, type Response } from "./LeagueSlice.types";

export default class LeagueSlice extends ServerSlice<
  Response,
  Request,
  { leagueId: LeagueIdSlice }
> {
  constructor() {
    super(undefined);
  }

  protected override onRequestBuild(): Request {
    return { id: this.slices.leagueId.response || "" };
  }

  protected override onFetch(
    request: Request,
    signal: AbortSignal,
  ): Promise<Response> {
    return CatanClient.INSTANCE.getLeague(request, signal);
  }
}
