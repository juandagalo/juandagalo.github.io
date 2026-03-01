import { createGitHubRepoRepository } from "./repositories/github-repo-repository";
import { createYamlConfigSource } from "./config/yaml-config-source";
import { createProjectService } from "./services/project-service";

export type {
  FeaturedProjectDTO,
  CompactProjectDTO,
  PostSummaryDTO,
} from "./types/dto";
export type { EnrichedRepo } from "./types/domain";

export async function getProjectData() {
  const username = import.meta.env.GITHUB_USERNAME ?? "juandagalo";
  const token = import.meta.env.GITHUB_TOKEN;

  const service = createProjectService({
    repoRepository: createGitHubRepoRepository(username, token),
    configSource: createYamlConfigSource(),
  });

  return service.getAllProjects();
}
