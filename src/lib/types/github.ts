export interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
  homepage: string | null;
}
