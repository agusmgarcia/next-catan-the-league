import { type GroupByInput, type GroupByOutput } from "./arrays.types";

export function groupBy<TArrayItem, TGroup extends string | number>(
  ...[array, groupBy]: GroupByInput<TArrayItem, TGroup>
): GroupByOutput<TArrayItem, TGroup> {
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
