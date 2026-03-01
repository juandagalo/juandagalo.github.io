import { describe, expect, it } from "vitest";
import { createProjectService } from "@/lib/services/project-service";
import { createMockRepoRepository } from "@/lib/repositories/mock-repo-repository";
import type { ConfigSource } from "@/lib/config/config-source";
import type { FeaturedRepoConfig } from "@/lib/types/config";
import type { GitHubRepo } from "@/lib/types/github";
import type { SortStrategy } from "@/lib/strategies/sort";
import type { EnrichedRepo } from "@/lib/types/domain";

const repos: GitHubRepo[] = [
  {
    name: "featured-one",
    html_url: "https://github.com/user/featured-one",
    description: "First featured",
    language: "TypeScript",
    stargazers_count: 42,
    topics: ["web"],
    updated_at: "2025-06-01T00:00:00Z",
    fork: false,
    homepage: null,
  },
  {
    name: "featured-two",
    html_url: "https://github.com/user/featured-two",
    description: "Second featured",
    language: "Python",
    stargazers_count: 18,
    topics: ["ml"],
    updated_at: "2025-05-15T00:00:00Z",
    fork: false,
    homepage: null,
  },
  {
    name: "other-repo",
    html_url: "https://github.com/user/other-repo",
    description: "Not featured",
    language: "Rust",
    stargazers_count: 7,
    topics: ["cli"],
    updated_at: "2025-03-20T00:00:00Z",
    fork: false,
    homepage: null,
  },
  {
    name: "another-other",
    html_url: "https://github.com/user/another-other",
    description: "Also not featured",
    language: "Go",
    stargazers_count: 3,
    topics: [],
    updated_at: "2025-04-10T00:00:00Z",
    fork: false,
    homepage: null,
  },
];

const config: FeaturedRepoConfig[] = [
  {
    repo: "featured-one",
    description_en: "Featured one EN",
    description_es: "Featured one ES",
    order: 2,
    category: "web",
    active: true,
  },
  {
    repo: "featured-two",
    description_en: "Featured two EN",
    description_es: "Featured two ES",
    order: 1,
    category: "data",
    active: true,
    highlights_en: ["ML pipeline"],
    highlights_es: ["Pipeline de ML"],
  },
];

function createMockConfigSource(data: FeaturedRepoConfig[]): ConfigSource {
  return {
    async load() {
      return data;
    },
  };
}

describe("createProjectService", () => {
  it("getAllProjects returns featured sorted by order, other sorted by updatedAt", async () => {
    const service = createProjectService({
      repoRepository: createMockRepoRepository(repos),
      configSource: createMockConfigSource(config),
    });

    const { featured, other } = await service.getAllProjects();

    expect(featured).toHaveLength(2);
    expect(featured[0].name).toBe("featured-two");
    expect(featured[1].name).toBe("featured-one");

    expect(other).toHaveLength(2);
    expect(other[0].name).toBe("another-other");
    expect(other[1].name).toBe("other-repo");
  });

  it("featured DTOs use YAML descriptions, other DTOs use API descriptions", async () => {
    const service = createProjectService({
      repoRepository: createMockRepoRepository(repos),
      configSource: createMockConfigSource(config),
    });

    const { featured, other } = await service.getAllProjects();

    expect(featured[0].description.en).toBe("Featured two EN");
    expect(featured[0].description.es).toBe("Featured two ES");

    expect(other[0].description.en).toBe("Also not featured");
    expect(other[0].description.es).toBe("Also not featured");
  });

  it("getFeaturedProjects returns only featured repos", async () => {
    const service = createProjectService({
      repoRepository: createMockRepoRepository(repos),
      configSource: createMockConfigSource(config),
    });

    const featured = await service.getFeaturedProjects();

    expect(featured).toHaveLength(2);
    expect(featured[0].name).toBe("featured-two");
    expect(featured[1].name).toBe("featured-one");
  });

  it("getOtherProjects returns only non-featured repos", async () => {
    const service = createProjectService({
      repoRepository: createMockRepoRepository(repos),
      configSource: createMockConfigSource(config),
    });

    const other = await service.getOtherProjects();

    expect(other).toHaveLength(2);
    expect(other[0].name).toBe("another-other");
    expect(other[1].name).toBe("other-repo");
  });

  it("respects custom sort strategy", async () => {
    const sortByStarsDesc: SortStrategy<EnrichedRepo> = (a, b) =>
      b.stars - a.stars;

    const service = createProjectService({
      repoRepository: createMockRepoRepository(repos),
      configSource: createMockConfigSource(config),
      otherSort: sortByStarsDesc,
    });

    const other = await service.getOtherProjects();

    expect(other[0].name).toBe("other-repo");
    expect(other[0].stars).toBe(7);
    expect(other[1].name).toBe("another-other");
    expect(other[1].stars).toBe(3);
  });

  it("returns empty arrays when repo list is empty", async () => {
    const service = createProjectService({
      repoRepository: createMockRepoRepository([]),
      configSource: createMockConfigSource(config),
    });

    const { featured, other } = await service.getAllProjects();

    expect(featured).toHaveLength(0);
    expect(other).toHaveLength(0);
  });

  it("returns empty arrays when config is empty", async () => {
    const service = createProjectService({
      repoRepository: createMockRepoRepository(repos),
      configSource: createMockConfigSource([]),
    });

    const { featured, other } = await service.getAllProjects();

    expect(featured).toHaveLength(0);
    expect(other).toHaveLength(4);
  });
});
