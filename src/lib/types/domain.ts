export interface EnrichedRepo {
  name: string;
  url: string;
  description: { en: string; es: string };
  language: string | null;
  stars: number;
  topics: string[];
  updatedAt: string;
  isFeatured: boolean;
  order: number;
  category: string;
  active: boolean;
  highlights: { en: string[]; es: string[] };
}
