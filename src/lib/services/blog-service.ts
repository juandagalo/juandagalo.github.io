import type { PostSummaryDTO } from "../types/dto";
import { toPostSummaryDTO } from "../mappers/dto-mapper";

export interface BlogEntry {
  id: string;
  slug: string;
  body: string;
  data: {
    title: string;
    description: string;
    date: Date;
    tags: string[];
    draft?: boolean;
    lang: string;
  };
}

export interface BlogServiceDeps {
  getCollection: () => Promise<BlogEntry[]>;
  estimateReadingTime?: (body: string) => number;
}

function defaultReadingTime(body: string): number {
  const words = body.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function createBlogService(deps: BlogServiceDeps) {
  const { getCollection, estimateReadingTime = defaultReadingTime } = deps;

  async function getFilteredPosts(lang: string): Promise<PostSummaryDTO[]> {
    const posts = await getCollection();
    return posts
      .filter((post) => post.data.lang === lang && !post.data.draft)
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => toPostSummaryDTO(post, estimateReadingTime(post.body)));
  }

  return {
    async getPostsByLang(lang: string): Promise<PostSummaryDTO[]> {
      return getFilteredPosts(lang);
    },

    async getLatestPosts(
      lang: string,
      limit: number,
    ): Promise<PostSummaryDTO[]> {
      const posts = await getFilteredPosts(lang);
      return posts.slice(0, limit);
    },
  };
}
