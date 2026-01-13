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
        if (state.loading || this.slices.leagues.loading) return;
        if (
          !!state.response &&
          this.slices.leagues.response.some((l) => l.id === state.response)
        )
          return;

        this.response =
          this.slices.leagues.response
            .filter((l) => !l.completedAt)
            .sort((l1, l2) => sorts.byNumberDesc(l1.updatedAt, l2.updatedAt))
            .find(finds.first)?.id ||
          this.slices.leagues.response
            .filter((l) => !!l.completedAt)
            .sort((l1, l2) =>
              sorts.byNumberDesc(l1.completedAt!, l2.completedAt!),
            )
            .find(finds.first)?.id;
      },
      equals.shallow,
    );

    this.slices.leagues.subscribe(
      (state) => state.response,
      (leagues) =>
        (this.response =
          leagues.find((l) => l.id === this.response)?.id ||
          leagues
            .filter((l) => !l.completedAt)
            .sort((l1, l2) => sorts.byNumberDesc(l1.updatedAt, l2.updatedAt))
            .find(finds.first)?.id ||
          leagues
            .filter((l) => !!l.completedAt)
            .sort((l1, l2) =>
              sorts.byNumberDesc(l1.completedAt!, l2.completedAt!),
            )
            .find(finds.first)?.id),
    );
  }

  set(id: string | undefined): void {
    this.response = id;
  }
}
