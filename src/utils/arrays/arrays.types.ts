import { type Func } from "@agusmgarcia/react-essentials-utils";

export type CountOccurrencesInput<TArrayItem> = [array: TArrayItem[]];

export type CountOccurrencesOuput<TArrayItem> = {
  count: number;
  item: TArrayItem;
}[];

export type GroupByInput<TArrayItem, TGroup extends string | number> = [
  array: TArrayItem[],
  groupBy: Func<TGroup, [item: TArrayItem]>,
];

export type GroupByOutput<TArrayItem, TGroup extends string | number> = {
  group: TGroup;
  values: TArrayItem[];
}[];
