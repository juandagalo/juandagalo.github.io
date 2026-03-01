import { describe, expect, it } from "vitest";
import { sortByOrder, sortByStars, sortByUpdated } from "@/lib/strategies/sort";
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
    order: 3,
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
    order: 1,
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
    order: 2,
    category: "tools",
    active: false,
    highlights: { en: [], es: [] },
  },
];

describe("sortByOrder", () => {
  it("sorts ascending by order field", () => {
    const sorted = [...mockRepos].sort(sortByOrder);
    expect(sorted.map((r) => r.order)).toEqual([1, 2, 3]);
  });

  it("keeps equal orders stable", () => {
    const items = [
      { order: 1, name: "first" },
      { order: 1, name: "second" },
    ];
    const sorted = [...items].sort(sortByOrder);
    expect(sorted[0].name).toBe("first");
  });
});

describe("sortByUpdated", () => {
  it("sorts descending by updatedAt (newest first)", () => {
    const sorted = [...mockRepos].sort(sortByUpdated);
    expect(sorted.map((r) => r.name)).toEqual(["repo-b", "repo-a", "repo-c"]);
  });
});

describe("sortByStars", () => {
  it("sorts descending by stars (most first)", () => {
    const sorted = [...mockRepos].sort(sortByStars);
    expect(sorted.map((r) => r.stars)).toEqual([50, 25, 10]);
  });
});
