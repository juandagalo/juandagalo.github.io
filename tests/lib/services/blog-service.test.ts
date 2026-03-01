import { describe, expect, it } from "vitest";
import { createBlogService } from "@/lib/services/blog-service";
import type { BlogEntry } from "@/lib/services/blog-service";

const posts: BlogEntry[] = [
  {
    id: "en-post-1",
    slug: "hello-world",
    body: "This is a short post with a few words.",
    data: {
      title: "Hello World",
      description: "My first post",
      date: new Date("2025-06-01"),
      tags: ["intro"],
      lang: "en",
    },
  },
  {
    id: "en-post-2",
    slug: "second-post",
    body: "Another post with some content here for testing purposes.",
    data: {
      title: "Second Post",
      description: "A follow-up",
      date: new Date("2025-06-15"),
      tags: ["update"],
      lang: "en",
    },
  },
  {
    id: "es-post-1",
    slug: "hola-mundo",
    body: "Este es un post corto con pocas palabras.",
    data: {
      title: "Hola Mundo",
      description: "Mi primer post",
      date: new Date("2025-06-01"),
      tags: ["intro"],
      lang: "es",
    },
  },
  {
    id: "en-draft",
    slug: "draft-post",
    body: "This is a draft that should not appear.",
    data: {
      title: "Draft Post",
      description: "Not ready yet",
      date: new Date("2025-06-20"),
      tags: ["draft"],
      draft: true,
      lang: "en",
    },
  },
];

function createMockCollection(entries: BlogEntry[]) {
  return async () => entries;
}

describe("createBlogService", () => {
  it("getPostsByLang filters by language", async () => {
    const service = createBlogService({
      getCollection: createMockCollection(posts),
    });

    const enPosts = await service.getPostsByLang("en");
    const esPosts = await service.getPostsByLang("es");

    expect(enPosts).toHaveLength(2);
    expect(esPosts).toHaveLength(1);
    expect(enPosts.every((p) => p.id.startsWith("en-"))).toBe(true);
    expect(esPosts[0].id).toBe("es-post-1");
  });

  it("excludes draft posts", async () => {
    const service = createBlogService({
      getCollection: createMockCollection(posts),
    });

    const enPosts = await service.getPostsByLang("en");

    expect(enPosts).toHaveLength(2);
    expect(enPosts.find((p) => p.slug === "draft-post")).toBeUndefined();
  });

  it("sorts posts newest-first", async () => {
    const service = createBlogService({
      getCollection: createMockCollection(posts),
    });

    const enPosts = await service.getPostsByLang("en");

    expect(enPosts[0].slug).toBe("second-post");
    expect(enPosts[1].slug).toBe("hello-world");
  });

  it("getLatestPosts limits results", async () => {
    const service = createBlogService({
      getCollection: createMockCollection(posts),
    });

    const latest = await service.getLatestPosts("en", 1);

    expect(latest).toHaveLength(1);
    expect(latest[0].slug).toBe("second-post");
  });

  it("calculates reading time with default estimator", async () => {
    const service = createBlogService({
      getCollection: createMockCollection(posts),
    });

    const enPosts = await service.getPostsByLang("en");

    expect(enPosts[0].readingTime).toBeGreaterThan(0);
  });

  it("uses custom reading time estimator when provided", async () => {
    const service = createBlogService({
      getCollection: createMockCollection(posts),
      estimateReadingTime: () => 5,
    });

    const enPosts = await service.getPostsByLang("en");

    expect(enPosts[0].readingTime).toBe(5);
    expect(enPosts[1].readingTime).toBe(5);
  });

  it("returns 0 reading time for empty body", async () => {
    const emptyBodyPost: BlogEntry[] = [
      {
        id: "en-empty",
        slug: "empty-body",
        body: "   ",
        data: {
          title: "Empty",
          description: "Empty body",
          date: new Date("2025-06-01"),
          tags: [],
          lang: "en",
        },
      },
    ];

    const service = createBlogService({
      getCollection: createMockCollection(emptyBodyPost),
    });

    const enPosts = await service.getPostsByLang("en");

    expect(enPosts[0].readingTime).toBe(0);
  });

  it("returns empty array for language with no posts", async () => {
    const service = createBlogService({
      getCollection: createMockCollection(posts),
    });

    const frPosts = await service.getPostsByLang("fr");

    expect(frPosts).toHaveLength(0);
  });
});
