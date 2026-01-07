import { type Func } from "@agusmgarcia/react-essentials-utils";

export type Input = [maxItem: number];

export type Output<TArrayItem> = [
  Func<TArrayItem[][], [result: TArrayItem[][], item: TArrayItem]>,
  TArrayItem[][],
];
