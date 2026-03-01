import { describe, expect, it } from "vitest";
import {
  toFeaturedDTO,
  toCompactDTO,
  toPostSummaryDTO,
} from "@/lib/mappers/dto-mapper";
import type { EnrichedRepo } from "@/lib/types/domain";

const enrichedRepo: EnrichedRepo = {
  name: "awesome-project",
  url: "https://github.com/user/awesome-project",
  description: { en: "An awesome project", es: "Un proyecto increible" },
  language: "TypeScript",
  stars: 42,
  topics: ["web", "typescript"],
  updatedAt: "2025-06-01T00:00:00Z",
  isFeatured: true,
  order: 1,
  category: "web",
  active: true,
  highlights: {
    en: ["Full-stack TypeScript"],
    es: ["TypeScript full-stack"],
  },
};

describe("toFeaturedDTO", () => {
  it("includes all featured fields", () => {
    const dto = toFeaturedDTO(enrichedRepo);

    expect(dto.name).toBe("awesome-project");
    expect(dto.url).toBe("https://github.com/user/awesome-project");
    expect(dto.description).toEqual({
      en: "An awesome project",
      es: "Un proyecto increible",
    });
    expect(dto.language).toBe("TypeScript");
    expect(dto.stars).toBe(42);
    expect(dto.topics).toEqual(["web", "typescript"]);
    expect(dto.category).toBe("web");
    expect(dto.active).toBe(true);
    expect(dto.order).toBe(1);
    expect(dto.highlights).toEqual({
      en: ["Full-stack TypeScript"],
      es: ["TypeScript full-stack"],
    });
  });

  it("excludes isFeatured and updatedAt", () => {
    const dto = toFeaturedDTO(enrichedRepo);
    const keys = Object.keys(dto);

    expect(keys).not.toContain("isFeatured");
    expect(keys).not.toContain("updatedAt");
  });
});

describe("toCompactDTO", () => {
  it("includes only the 5 compact fields", () => {
    const dto = toCompactDTO(enrichedRepo);

    expect(dto.name).toBe("awesome-project");
    expect(dto.url).toBe("https://github.com/user/awesome-project");
    expect(dto.description).toEqual({
      en: "An awesome project",
      es: "Un proyecto increible",
    });
    expect(dto.language).toBe("TypeScript");
    expect(dto.stars).toBe(42);
  });

  it("excludes fields beyond the 5 compact ones", () => {
    const dto = toCompactDTO(enrichedRepo);
    const keys = Object.keys(dto);

    expect(keys).toHaveLength(5);
    expect(keys).not.toContain("topics");
    expect(keys).not.toContain("category");
    expect(keys).not.toContain("order");
    expect(keys).not.toContain("highlights");
    expect(keys).not.toContain("isFeatured");
    expect(keys).not.toContain("updatedAt");
    expect(keys).not.toContain("active");
  });
});

describe("toPostSummaryDTO", () => {
  it("maps post entry to PostSummaryDTO", () => {
    const post = {
      id: "post-1",
      slug: "hello-world",
      data: {
        title: "Hello World",
        description: "My first post",
        date: new Date("2025-06-01"),
        tags: ["intro", "blog"],
      },
    };

    const dto = toPostSummaryDTO(post, 3);

    expect(dto.id).toBe("post-1");
    expect(dto.slug).toBe("hello-world");
    expect(dto.title).toBe("Hello World");
    expect(dto.description).toBe("My first post");
    expect(dto.date).toEqual(new Date("2025-06-01"));
    expect(dto.tags).toEqual(["intro", "blog"]);
    expect(dto.readingTime).toBe(3);
  });
});
