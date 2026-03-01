import type { FeaturedRepoConfig } from "@/lib/types/config";
import type { EnrichedRepo } from "@/lib/types/domain";
import type { GitHubRepo } from "@/lib/types/github";

export function enrichRepos(
  apiRepos: GitHubRepo[],
  config: FeaturedRepoConfig[],
): { featured: EnrichedRepo[]; other: EnrichedRepo[] } {
  const configMap = new Map(config.map((c) => [c.repo, c]));

  const featured: EnrichedRepo[] = [];
  const other: EnrichedRepo[] = [];

  for (const repo of apiRepos) {
    const cfg = configMap.get(repo.name);

    if (cfg) {
      featured.push({
        name: repo.name,
        url: repo.html_url,
        description: {
          en: cfg.description_en,
          es: cfg.description_es,
        },
        language: repo.language,
        stars: repo.stargazers_count,
        topics: repo.topics,
        updatedAt: repo.updated_at,
        isFeatured: true,
        order: cfg.order,
        category: cfg.category,
        active: cfg.active,
        highlights: {
          en: cfg.highlights_en ?? [],
          es: cfg.highlights_es ?? [],
        },
      });
    } else {
      other.push({
        name: repo.name,
        url: repo.html_url,
        description: {
          en: repo.description ?? "",
          es: repo.description ?? "",
        },
        language: repo.language,
        stars: repo.stargazers_count,
        topics: repo.topics,
        updatedAt: repo.updated_at,
        isFeatured: false,
        order: 0,
        category: "",
        active: true,
        highlights: { en: [], es: [] },
      });
    }
  }

  return { featured, other };
}
