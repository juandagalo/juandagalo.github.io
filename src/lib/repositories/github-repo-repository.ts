import type { GitHubRepo } from "../types/github";
import type { RepoRepository } from "./repo-repository";

export function createGitHubRepoRepository(
  username: string,
  token?: string,
): RepoRepository {
  return {
    async fetchAll(): Promise<GitHubRepo[]> {
      const headers: Record<string, string> = {
        Accept: "application/vnd.github.v3+json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const encodedUsername = encodeURIComponent(username);

      const response = await fetch(
        `https://api.github.com/users/${encodedUsername}/repos?per_page=100&sort=updated&type=owner`,
        { headers },
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos: GitHubRepo[] = await response.json();

      return repos.filter(
        (repo) => !repo.fork && repo.name !== `${username}.github.io`,
      );
    },
  };
}
