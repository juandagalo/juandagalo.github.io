import type { FeaturedRepoConfig } from "@/lib/types/config";

export interface ConfigSource {
  load(): Promise<FeaturedRepoConfig[]>;
}
