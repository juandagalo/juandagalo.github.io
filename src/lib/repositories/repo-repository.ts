import type { GitHubRepo } from "../types/github";

export interface RepoRepository {
  fetchAll(): Promise<GitHubRepo[]>;
}
