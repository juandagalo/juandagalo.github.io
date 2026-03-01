import yaml from "js-yaml";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { FeaturedRepoConfig } from "../types/config";
import type { ConfigSource } from "./config-source";

export function createYamlConfigSource(filePath?: string): ConfigSource {
  const path = filePath ?? resolve("src/data/featured-repos.yaml");

  return {
    async load(): Promise<FeaturedRepoConfig[]> {
      const content = readFileSync(path, "utf-8");
      return yaml.load(content) as FeaturedRepoConfig[];
    },
  };
}
