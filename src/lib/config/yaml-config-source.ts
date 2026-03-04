import yaml from "js-yaml";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { FeaturedRepoConfig } from "@/lib/types/config";
import type { ConfigSource } from "@/lib/config/config-source";

export function createYamlConfigSource(filePath?: string): ConfigSource {
  // import.meta.url breaks after Astro bundles code into dist/chunks/,
  // so we use process.cwd() which is always the project root at build time.
  const defaultPath = join(process.cwd(), "src", "data", "featured-repos.yaml");
  const path = filePath ?? defaultPath;

  return {
    async load(): Promise<FeaturedRepoConfig[]> {
      const content = await readFile(path, "utf-8");
      const parsed = yaml.load(content);

      if (!Array.isArray(parsed)) {
        throw new Error(
          `Invalid featured repos config at "${path}": expected a top-level array`,
        );
      }

      return parsed as FeaturedRepoConfig[];
    },
  };
}
