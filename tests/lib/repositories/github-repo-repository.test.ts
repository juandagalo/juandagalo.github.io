import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createGitHubRepoRepository } from "@/lib/repositories/github-repo-repository";
import { createMockRepoRepository } from "@/lib/repositories/mock-repo-repository";
import type { GitHubRepo } from "@/lib/types/github";
import fixtures from "../../fixtures/repos.json";

const typedFixtures = fixtures as GitHubRepo[];

describe("createGitHubRepoRepository", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches repos from the GitHub API", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(typedFixtures), { status: 200 }),
    );

    const repo = createGitHubRepoRepository("testuser");
    const result = await repo.fetchAll();

    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/users/testuser/repos?per_page=100&sort=updated&type=owner",
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: "application/vnd.github.v3+json",
        }),
      }),
    );
    expect(result.length).toBeGreaterThan(0);
  });

  it("filters out forks", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(typedFixtures), { status: 200 }),
    );

    const repo = createGitHubRepoRepository("testuser");
    const result = await repo.fetchAll();

    expect(result.every((r) => !r.fork)).toBe(true);
    expect(result.find((r) => r.name === "forked-lib")).toBeUndefined();
  });

  it("filters out the portfolio repo", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(typedFixtures), { status: 200 }),
    );

    const repo = createGitHubRepoRepository("testuser");
    const result = await repo.fetchAll();

    expect(result.find((r) => r.name === "testuser.github.io")).toBeUndefined();
  });

  it("returns only non-fork, non-portfolio repos", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(typedFixtures), { status: 200 }),
    );

    const repo = createGitHubRepoRepository("testuser");
    const result = await repo.fetchAll();

    const expectedNames = [
      "awesome-project",
      "ml-pipeline",
      "rust-cli",
      "data-viz",
    ];
    expect(result.map((r) => r.name)).toEqual(expectedNames);
  });

  it("sends Authorization header when token is provided", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify([]), { status: 200 }),
    );

    const repo = createGitHubRepoRepository("testuser", "gh_token_123");
    await repo.fetchAll();

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer gh_token_123",
        }),
      }),
    );
  });

  it("does not send Authorization header when no token", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify([]), { status: 200 }),
    );

    const repo = createGitHubRepoRepository("testuser");
    await repo.fetchAll();

    const callHeaders = vi.mocked(fetch).mock.calls[0][1]?.headers as Record<
      string,
      string
    >;
    expect(callHeaders.Authorization).toBeUndefined();
  });

  it("throws on non-OK response", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response("Not Found", { status: 404 }),
    );

    const repo = createGitHubRepoRepository("testuser");

    await expect(repo.fetchAll()).rejects.toThrow("GitHub API error: 404");
  });
});

describe("createMockRepoRepository", () => {
  it("returns provided fixtures", async () => {
    const repo = createMockRepoRepository(typedFixtures);
    const result = await repo.fetchAll();

    expect(result).toEqual(typedFixtures);
  });

  it("returns default fixtures when none provided", async () => {
    const repo = createMockRepoRepository();
    const result = await repo.fetchAll();

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].name).toBe("example-project");
  });
});
