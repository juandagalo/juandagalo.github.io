import type { PostEntry } from "@/lib/types/blog";
import type { EnrichedRepo } from "@/lib/types/domain";
import type {
  CompactProjectDTO,
  FeaturedProjectDTO,
  PostSummaryDTO,
} from "@/lib/types/dto";

export type { PostEntry };

export function toFeaturedDTO(repo: EnrichedRepo): FeaturedProjectDTO {
  return {
    name: repo.name,
    url: repo.url,
    description: repo.description,
    language: repo.language,
    stars: repo.stars,
    topics: repo.topics,
    category: repo.category,
    active: repo.active,
    order: repo.order,
    highlights: repo.highlights,
  };
}

export function toCompactDTO(repo: EnrichedRepo): CompactProjectDTO {
  return {
    name: repo.name,
    url: repo.url,
    description: repo.description,
    language: repo.language,
    stars: repo.stars,
  };
}

export function toPostSummaryDTO(
  post: PostEntry,
  readingTime: number,
): PostSummaryDTO {
  return {
    id: post.id,
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    date: post.data.date,
    tags: post.data.tags,
    readingTime,
  };
}
