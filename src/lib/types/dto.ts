import type { EnrichedRepo } from "./domain";

export type FeaturedProjectDTO = Pick<
  EnrichedRepo,
  | "name"
  | "url"
  | "description"
  | "language"
  | "stars"
  | "topics"
  | "category"
  | "active"
  | "order"
  | "highlights"
>;

export type CompactProjectDTO = Pick<
  EnrichedRepo,
  "name" | "url" | "description" | "language" | "stars"
>;

export interface PostSummaryDTO {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  readingTime: number;
}
