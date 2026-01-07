import { type Input, type Output } from "./splitArrays.types";

export default function splitArrays<TArrayItem>(
  ...[maxItems]: Input
): Output<TArrayItem> {
  return [
    (result: TArrayItem[][], item: TArrayItem) => {
      if (!result.length || result.at(-1)!.length >= maxItems) result.push([]);
      result.at(-1)!.push(item);
      return result;
    },
    [] as TArrayItem[][],
  ];
}
