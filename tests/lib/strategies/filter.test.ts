import { describe, expect, it } from "vitest";
import { filterActive, filterByCategory } from "@/lib/strategies/filter";
import type { EnrichedRepo } from "@/lib/types/domain";

const mockRepos: EnrichedRepo[] = [
  {
    name: "repo-a",
    url: "https://github.com/user/repo-a",
    description: { en: "Repo A", es: "Repo A" },
    language: "TypeScript",
    stars: 10,
    topics: [],
    updatedAt: "2025-03-01T00:00:00Z",
    isFeatured: true,
    order: 1,
    category: "web",
    active: true,
    highlights: { en: [], es: [] },
  },
  {
    name: "repo-b",
    url: "https://github.com/user/repo-b",
    description: { en: "Repo B", es: "Repo B" },
    language: "Python",
    stars: 50,
    topics: [],
    updatedAt: "2025-06-15T00:00:00Z",
    isFeatured: true,
    order: 2,
    category: "ml",
    active: true,
    highlights: { en: [], es: [] },
  },
  {
    name: "repo-c",
    url: "https://github.com/user/repo-c",
    description: { en: "Repo C", es: "Repo C" },
    language: "Rust",
    stars: 25,
    topics: [],
    updatedAt: "2025-01-10T00:00:00Z",
    isFeatured: false,
    order: 3,
    category: "web",
    active: false,
    highlights: { en: [], es: [] },
  },
];

describe("filterByCategory", () => {
  it("filters repos by matching category", () => {
    const webRepos = mockRepos.filter(filterByCategory("web"));
    expect(webRepos).toHaveLength(2);
    expect(webRepos.map((r) => r.name)).toEqual(["repo-a", "repo-c"]);
  });

  it("returns empty array when no repos match", () => {
    const result = mockRepos.filter(filterByCategory("mobile"));
    expect(result).toHaveLength(0);
  });

  it("returns single match for unique category", () => {
    const mlRepos = mockRepos.filter(filterByCategory("ml"));
    expect(mlRepos).toHaveLength(1);
    expect(mlRepos[0].name).toBe("repo-b");
  });
});

describe("filterActive", () => {
  it("filters to only active repos", () => {
    const active = mockRepos.filter(filterActive);
    expect(active).toHaveLength(2);
    expect(active.every((r) => r.active)).toBe(true);
  });

  it("excludes inactive repos", () => {
    const active = mockRepos.filter(filterActive);
    expect(active.find((r) => r.name === "repo-c")).toBeUndefined();
  });
});
