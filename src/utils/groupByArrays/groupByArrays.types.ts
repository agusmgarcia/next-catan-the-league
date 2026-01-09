import { type Func } from "@agusmgarcia/react-essentials-utils";

export type Input<TArrayItem, TGroup extends string | number> = [
  array: TArrayItem[],
  groupBy: Func<TGroup, [item: TArrayItem]>,
];

export type Output<TArrayItem, TGroup extends string | number> = {
  group: TGroup;
  values: TArrayItem[];
}[];
