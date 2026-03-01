export type SortStrategy<T> = (a: T, b: T) => number;

export const sortByOrder: SortStrategy<{ order: number }> = (a, b) =>
  a.order - b.order;

export const sortByUpdated: SortStrategy<{ updatedAt: string }> = (a, b) =>
  new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();

export const sortByStars: SortStrategy<{ stars: number }> = (a, b) =>
  b.stars - a.stars;
