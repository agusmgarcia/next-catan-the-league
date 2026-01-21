import { sorts } from "@agusmgarcia/react-essentials-utils";

import {
  type CountOccurrencesInput,
  type CountOccurrencesOuput,
  type GroupByInput,
  type GroupByOutput,
} from "./arrays.types";

export function countOccurrences<TArrayItem>(
  ...[array]: CountOccurrencesInput<TArrayItem>
): CountOccurrencesOuput<TArrayItem> {
  const map = new Map<TArrayItem, number>();

  for (const item of array) {
    if (!map.has(item)) map.set(item, 0);
    const count = map.get(item)!;
    map.set(item, count + 1);
  }

  return [...map.entries()]
    .map(([item, count]) => ({ count, item }))
    .sort((a, b) => sorts.byNumberDesc(a.count, b.count));
}

export function groupBy<TArrayItem, TGroup extends string | number>(
  ...[array, groupBy]: GroupByInput<TArrayItem, TGroup>
): GroupByOutput<TArrayItem, TGroup> {
  const result = new Map<TGroup, TArrayItem[]>();

  for (const item of array) {
    const group = groupBy(item);
    if (!result.has(group)) result.set(group, []);
    result.get(group)!.push(item);
  }

  return [...result.keys()].map((group) => ({
    group,
    values: result.get(group) || [],
  }));
}
