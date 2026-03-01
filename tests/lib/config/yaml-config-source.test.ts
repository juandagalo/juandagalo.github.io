import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { createYamlConfigSource } from "@/lib/config/yaml-config-source";

const fixturePath = resolve("tests/fixtures/featured-config.yaml");

describe("createYamlConfigSource", () => {
  it("loads and parses YAML config", async () => {
    const source = createYamlConfigSource(fixturePath);
    const config = await source.load();

    expect(Array.isArray(config)).toBe(true);
    expect(config).toHaveLength(3);
  });

  it("returns objects matching FeaturedRepoConfig shape", async () => {
    const source = createYamlConfigSource(fixturePath);
    const config = await source.load();

    const first = config[0];
    expect(first.repo).toBe("awesome-project");
    expect(first.description_en).toBe("An awesome full-stack project");
    expect(first.description_es).toBe("Un proyecto full-stack increíble");
    expect(first.order).toBe(1);
    expect(first.category).toBe("web");
    expect(first.active).toBe(true);
    expect(first.highlights_en).toEqual([
      "Full-stack TypeScript",
      "Real-time features",
    ]);
  });

  it("handles entries without optional highlights", async () => {
    const source = createYamlConfigSource(fixturePath);
    const config = await source.load();

    const second = config[1];
    expect(second.repo).toBe("ml-pipeline");
    expect(second.highlights_en).toBeUndefined();
    expect(second.highlights_es).toBeUndefined();
  });

  it("preserves active/inactive status", async () => {
    const source = createYamlConfigSource(fixturePath);
    const config = await source.load();

    expect(config[0].active).toBe(true);
    expect(config[2].active).toBe(false);
  });

  it("throws on non-existent file", async () => {
    const source = createYamlConfigSource("/nonexistent/path.yaml");

    await expect(source.load()).rejects.toThrow();
  });
});
