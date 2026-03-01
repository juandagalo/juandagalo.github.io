import { createGitHubRepoRepository } from "@/lib/repositories/github-repo-repository";
import { createYamlConfigSource } from "@/lib/config/yaml-config-source";
import { createProjectService } from "@/lib/services/project-service";

export type {
  FeaturedProjectDTO,
  CompactProjectDTO,
  PostSummaryDTO,
} from "@/lib/types/dto";
export type { EnrichedRepo } from "@/lib/types/domain";

export async function getProjectData() {
  const username = import.meta.env.GITHUB_USERNAME?.trim() || "juandagalo";
  const token = import.meta.env.GITHUB_TOKEN?.trim() || undefined;

  const service = createProjectService({
    repoRepository: createGitHubRepoRepository(username, token),
    configSource: createYamlConfigSource(),
  });

  return service.getAllProjects();
}
