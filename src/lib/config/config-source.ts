import type { FeaturedRepoConfig } from "../types/config";

export interface ConfigSource {
  load(): Promise<FeaturedRepoConfig[]>;
}
