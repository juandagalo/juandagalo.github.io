import { describe, expect, it } from "vitest";
import { enrichRepos } from "@/lib/mappers/repo-mapper";
import type { GitHubRepo } from "@/lib/types/github";
import type { FeaturedRepoConfig } from "@/lib/types/config";

const apiRepo: GitHubRepo = {
  name: "awesome-project",
  html_url: "https://github.com/user/awesome-project",
  description: "An awesome project",
  language: "TypeScript",
  stargazers_count: 42,
  topics: ["web", "typescript"],
  updated_at: "2025-06-01T00:00:00Z",
  fork: false,
  homepage: "https://awesome.dev",
};

const config: FeaturedRepoConfig = {
  repo: "awesome-project",
  description_en: "An awesome full-stack project",
  description_es: "Un proyecto full-stack increible",
  order: 1,
  category: "web",
  active: true,
  highlights_en: ["Full-stack TypeScript", "Real-time features"],
  highlights_es: ["TypeScript full-stack", "Funciones en tiempo real"],
};

describe("enrichRepos", () => {
  it("matches repo to config and marks as featured", () => {
    const { featured, other } = enrichRepos([apiRepo], [config]);

    expect(featured).toHaveLength(1);
    expect(other).toHaveLength(0);

    const repo = featured[0];
    expect(repo.isFeatured).toBe(true);
    expect(repo.name).toBe("awesome-project");
    expect(repo.url).toBe(apiRepo.html_url);
    expect(repo.description.en).toBe(config.description_en);
    expect(repo.description.es).toBe(config.description_es);
    expect(repo.order).toBe(1);
    expect(repo.category).toBe("web");
    expect(repo.active).toBe(true);
    expect(repo.highlights.en).toEqual([
      "Full-stack TypeScript",
      "Real-time features",
    ]);
    expect(repo.highlights.es).toEqual([
      "TypeScript full-stack",
      "Funciones en tiempo real",
    ]);
  });

  it("uses API data for fields not in config", () => {
    const { featured } = enrichRepos([apiRepo], [config]);

    const repo = featured[0];
    expect(repo.language).toBe("TypeScript");
    expect(repo.stars).toBe(42);
    expect(repo.topics).toEqual(["web", "typescript"]);
    expect(repo.updatedAt).toBe("2025-06-01T00:00:00Z");
  });

  it("puts unmatched repos in other with isFeatured false", () => {
    const unmatchedRepo: GitHubRepo = {
      ...apiRepo,
      name: "other-project",
      html_url: "https://github.com/user/other-project",
      description: "Some other project",
    };

    const { featured, other } = enrichRepos([unmatchedRepo], [config]);

    expect(featured).toHaveLength(0);
    expect(other).toHaveLength(1);

    const repo = other[0];
    expect(repo.isFeatured).toBe(false);
    expect(repo.description.en).toBe("Some other project");
    expect(repo.description.es).toBe("Some other project");
    expect(repo.order).toBe(0);
    expect(repo.category).toBe("");
    expect(repo.active).toBe(true);
    expect(repo.highlights.en).toEqual([]);
    expect(repo.highlights.es).toEqual([]);
  });

  it("handles null API description with empty string fallback", () => {
    const nullDescRepo: GitHubRepo = {
      ...apiRepo,
      name: "no-desc",
      description: null,
    };

    const { other } = enrichRepos([nullDescRepo], []);

    expect(other[0].description.en).toBe("");
    expect(other[0].description.es).toBe("");
  });

  it("defaults missing highlights to empty arrays", () => {
    const configNoHighlights: FeaturedRepoConfig = {
      repo: "awesome-project",
      description_en: "Desc EN",
      description_es: "Desc ES",
      order: 1,
      category: "web",
      active: true,
    };

    const { featured } = enrichRepos([apiRepo], [configNoHighlights]);

    expect(featured[0].highlights.en).toEqual([]);
    expect(featured[0].highlights.es).toEqual([]);
  });

  it("returns empty arrays when config is empty", () => {
    const { featured, other } = enrichRepos([apiRepo], []);

    expect(featured).toHaveLength(0);
    expect(other).toHaveLength(1);
  });

  it("returns empty arrays when API repos is empty", () => {
    const { featured, other } = enrichRepos([], [config]);

    expect(featured).toHaveLength(0);
    expect(other).toHaveLength(0);
  });

  it("splits multiple repos between featured and other", () => {
    const secondRepo: GitHubRepo = {
      ...apiRepo,
      name: "ml-pipeline",
      html_url: "https://github.com/user/ml-pipeline",
    };
    const secondConfig: FeaturedRepoConfig = {
      repo: "ml-pipeline",
      description_en: "ML pipeline",
      description_es: "Pipeline de ML",
      order: 2,
      category: "data",
      active: true,
    };
    const unfeaturedRepo: GitHubRepo = {
      ...apiRepo,
      name: "random-lib",
      html_url: "https://github.com/user/random-lib",
    };

    const { featured, other } = enrichRepos(
      [apiRepo, secondRepo, unfeaturedRepo],
      [config, secondConfig],
    );

    expect(featured).toHaveLength(2);
    expect(other).toHaveLength(1);
    expect(featured.map((r) => r.name)).toEqual([
      "awesome-project",
      "ml-pipeline",
    ]);
    expect(other[0].name).toBe("random-lib");
  });
});
