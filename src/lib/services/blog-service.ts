import type { PostSummaryDTO } from "@/lib/types/dto";
import type { BlogEntry } from "@/lib/types/blog";
import { toPostSummaryDTO } from "@/lib/mappers/dto-mapper";

export type { BlogEntry };

export interface BlogServiceDeps {
  getCollection: () => Promise<BlogEntry[]>;
  estimateReadingTime?: (body: string) => number;
}

function defaultReadingTime(body: string): number {
  const trimmed = body.trim();
  if (!trimmed) {
    return 0;
  }
  const words = trimmed.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function createBlogService(deps: BlogServiceDeps) {
  const { getCollection, estimateReadingTime = defaultReadingTime } = deps;

  async function getFilteredPosts(
    lang: string,
    limit?: number,
  ): Promise<PostSummaryDTO[]> {
    const posts = await getCollection();
    const sorted = posts
      .filter((post) => post.data.lang === lang && !post.data.draft)
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
    const sliced = limit != null ? sorted.slice(0, limit) : sorted;
    return sliced.map((post) =>
      toPostSummaryDTO(post, estimateReadingTime(post.body)),
    );
  }

  return {
    async getPostsByLang(lang: string): Promise<PostSummaryDTO[]> {
      return getFilteredPosts(lang);
    },

    async getLatestPosts(
      lang: string,
      limit: number,
    ): Promise<PostSummaryDTO[]> {
      return getFilteredPosts(lang, limit);
    },
  };
}
