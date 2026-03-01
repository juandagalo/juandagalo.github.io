import type { GitHubRepo } from "@/lib/types/github";

export interface RepoRepository {
  fetchAll(): Promise<GitHubRepo[]>;
}
