import { LocalStorageSlice } from "@agusmgarcia/react-essentials-store";
import { equals, finds } from "@agusmgarcia/react-essentials-utils";

import { type LeaguesSlice } from "../LeaguesSlice";
import { type Data } from "./LeagueIdSlice.types";

export default class LeagueIdSlice extends LocalStorageSlice<
  Data,
  { leagues: LeaguesSlice }
> {
  constructor() {
    super("leagueId");
  }

  protected override onInit(signal: AbortSignal): void {
    super.onInit(signal);

    this.subscribe(
      (state) => state,
      (state) => {
        if (state.loading || this.slices.leagues.loading) return;
        if (!!state.error || !!this.slices.leagues.error) return;
        if (!!state.response) return;
        if (this.slices.leagues.response.length !== 1) return;
        this.response = this.slices.leagues.response.find(finds.single)?.id;
      },
      equals.shallow,
    );
  }

  set(id: string): void {
    this.response = id;
  }
}
