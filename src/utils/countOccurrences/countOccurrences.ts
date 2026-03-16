import { sorts } from "@agusmgarcia/react-essentials-utils";

import { type Input, type Output } from "./countOccurrences.types";

export default function countOccurrences<TArrayItem>(
  ...[array]: Input<TArrayItem>
): Output<TArrayItem> {
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
