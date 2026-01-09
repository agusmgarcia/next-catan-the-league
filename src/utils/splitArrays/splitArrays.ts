import { type Input, type Output } from "./splitArrays.types";

export default function splitArrays<TArrayItem>(
  ...[array, maxItems]: Input<TArrayItem>
): Output<TArrayItem> {
  const result = [[]] as TArrayItem[][];

  for (const item of array) {
    if (result.at(-1)!.length >= maxItems) result.push([]);
    result.at(-1)!.push(item);
  }

  return result;
}
