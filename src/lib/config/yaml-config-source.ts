import yaml from "js-yaml";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { FeaturedRepoConfig } from "../types/config";
import type { ConfigSource } from "./config-source";

export function createYamlConfigSource(filePath?: string): ConfigSource {
  const defaultPath = fileURLToPath(
    new URL("../../data/featured-repos.yaml", import.meta.url),
  );
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
