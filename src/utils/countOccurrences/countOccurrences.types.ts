export type Input<TArrayItem> = [array: TArrayItem[]];

export type Output<TArrayItem> = {
  count: number;
  item: TArrayItem;
}[];
