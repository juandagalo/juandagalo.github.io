export interface FeaturedRepoConfig {
  repo: string;
  description_en: string;
  description_es: string;
  order: number;
  category: string;
  active: boolean;
  highlights_en?: string[];
  highlights_es?: string[];
}
