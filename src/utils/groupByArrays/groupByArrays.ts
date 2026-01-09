import { type Input, type Output } from "./groupByArrays.types";

export default function groupByArrays<
  TArrayItem,
  TGroup extends string | number,
>(...[array, groupBy]: Input<TArrayItem, TGroup>): Output<TArrayItem, TGroup> {
  const result = new Map<TGroup, TArrayItem[]>();

  for (const item of array) {
    const group = groupBy(item);
    if (!result.has(group)) result.set(group, []);
    result.get(group)!.push(item);
  }

  return result
    .keys()
    .map((group) => ({ group, values: result.get(group) || [] }))
    .toArray();
}
