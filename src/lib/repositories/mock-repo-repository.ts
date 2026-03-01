import type { GitHubRepo } from "@/lib/types/github";
import type { RepoRepository } from "@/lib/repositories/repo-repository";

const defaultFixtures: GitHubRepo[] = [
  {
    name: "example-project",
    html_url: "https://github.com/user/example-project",
    description: "An example project",
    language: "TypeScript",
    stargazers_count: 10,
    topics: ["web", "astro"],
    updated_at: "2025-06-01T00:00:00Z",
    fork: false,
    homepage: null,
  },
];

export function createMockRepoRepository(
  fixtures?: GitHubRepo[],
): RepoRepository {
  return {
    async fetchAll(): Promise<GitHubRepo[]> {
      return fixtures ?? defaultFixtures;
    },
  };
}
