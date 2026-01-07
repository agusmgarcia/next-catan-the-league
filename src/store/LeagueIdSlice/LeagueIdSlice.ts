import { LocalStorageSlice } from "@agusmgarcia/react-essentials-store";
import { equals, finds, sorts } from "@agusmgarcia/react-essentials-utils";

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
        if (state.loading) return;
        if (!this.slices.leagues.response.length) return;
        if (
          !!state.response &&
          this.slices.leagues.response.some((l) => l.id === state.response) &&
          !state.error
        )
          return;

        this.response =
          this.slices.leagues.response.find((l) => !l.completedAt)?.id ||
          this.slices.leagues.response
            .filter((l) => !!l.completedAt)
            .sort((a, b) => sorts.byNumberDesc(a.completedAt!, b.completedAt!))
            .find(finds.first)?.id;
      },
      equals.shallow,
    );

    this.slices.leagues.subscribe(
      (state) => state.response,
      (leagues) =>
        (this.response =
          leagues.find((l) => l.id === this.response)?.id ||
          leagues.find((l) => !l.completedAt)?.id ||
          leagues
            .filter((l) => !!l.completedAt)
            .sort((a, b) => sorts.byNumberDesc(a.completedAt!, b.completedAt!))
            .find(finds.first)?.id),
    );
  }

  set(id: string): void {
    this.response = id;
  }
}
