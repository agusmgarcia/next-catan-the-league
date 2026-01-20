import { LocalStorageSlice } from "@agusmgarcia/react-essentials-store";
import { equals, finds, sorts } from "@agusmgarcia/react-essentials-utils";

import { type LeaguesSlice } from "../LeaguesSlice";
import { type UserSlice } from "../UserSlice";
import { type Data } from "./LeagueIdSlice.types";

export default class LeagueIdSlice extends LocalStorageSlice<
  Data,
  { leagues: LeaguesSlice; user: UserSlice }
> {
  constructor() {
    super("leagueId");
  }

  protected override onInit(signal: AbortSignal): void {
    super.onInit(signal);

    this.subscribe(
      (state) => state,
      (state) => {
        if (!!state.response) return;
        if (state.loading || this.slices.leagues.loading) return;
        if (!!state.error || !!this.slices.leagues.error) return;
        this.response = this.slices.leagues.response
          .sort((l1, l2) => sorts.byNumberDesc(l1.updatedAt, l2.updatedAt))
          .find(finds.first)?.id;
      },
      equals.shallow,
    );

    this.slices.leagues.subscribe(
      (state) => state,
      (state) => {
        if (!!this.response) return;
        if (this.loading || state.loading) return;
        if (!!this.error || !!state.error) return;
        this.response = state.response
          .sort((l1, l2) => sorts.byNumberDesc(l1.updatedAt, l2.updatedAt))
          .find(finds.first)?.id;
      },
      equals.shallow,
    );

    this.slices.user.subscribe(
      (state) => state.response?.id,
      (userId) => {
        if (!!userId) return;
        this.response = undefined;
      },
    );
  }

  set(id: string): void {
    this.response = id;
  }
}
