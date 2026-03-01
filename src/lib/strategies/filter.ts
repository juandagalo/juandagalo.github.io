export type FilterStrategy<T> = (item: T) => boolean;

export const filterByCategory =
  (category: string): FilterStrategy<{ category: string }> =>
  (item) =>
    item.category === category;

export const filterActive: FilterStrategy<{ active: boolean }> = (item) =>
  item.active;
