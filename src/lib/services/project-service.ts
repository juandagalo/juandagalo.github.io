import type { ConfigSource } from "@/lib/config/config-source";
import type { EnrichedRepo } from "@/lib/types/domain";
import type { CompactProjectDTO, FeaturedProjectDTO } from "@/lib/types/dto";
import type { RepoRepository } from "@/lib/repositories/repo-repository";
import type { SortStrategy } from "@/lib/strategies/sort";
import { sortByOrder, sortByUpdated } from "@/lib/strategies/sort";
import { enrichRepos } from "@/lib/mappers/repo-mapper";
import { toCompactDTO, toFeaturedDTO } from "@/lib/mappers/dto-mapper";

export interface ProjectServiceDeps {
  repoRepository: RepoRepository;
  configSource: ConfigSource;
  featuredSort?: SortStrategy<EnrichedRepo>;
  otherSort?: SortStrategy<EnrichedRepo>;
}

export function createProjectService(deps: ProjectServiceDeps) {
  const {
    repoRepository,
    configSource,
    featuredSort = sortByOrder,
    otherSort = sortByUpdated,
  } = deps;

  async function fetchAndEnrich() {
    const [repos, config] = await Promise.all([
      repoRepository.fetchAll(),
      configSource.load(),
    ]);
    return enrichRepos(repos, config);
  }

  return {
    async getAllProjects(): Promise<{
      featured: FeaturedProjectDTO[];
      other: CompactProjectDTO[];
    }> {
      const { featured, other } = await fetchAndEnrich();
      return {
        featured: featured.sort(featuredSort).map(toFeaturedDTO),
        other: other.sort(otherSort).map(toCompactDTO),
      };
    },

    async getFeaturedProjects(): Promise<FeaturedProjectDTO[]> {
      const { featured } = await fetchAndEnrich();
      return featured.sort(featuredSort).map(toFeaturedDTO);
    },

    async getOtherProjects(): Promise<CompactProjectDTO[]> {
      const { other } = await fetchAndEnrich();
      return other.sort(otherSort).map(toCompactDTO);
    },
  };
}
