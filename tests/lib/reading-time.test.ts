import { describe, expect, it } from "vitest";
import { calculateReadingTime } from "@/lib/reading-time";

describe("calculateReadingTime", () => {
  it("returns 1 minute for 200 words", () => {
    const text = Array(200).fill("word").join(" ");
    expect(calculateReadingTime(text)).toBe(1);
  });

  it("returns 2 minutes for 400 words", () => {
    const text = Array(400).fill("word").join(" ");
    expect(calculateReadingTime(text)).toBe(2);
  });

  it("rounds up partial minutes", () => {
    const text = Array(201).fill("word").join(" ");
    expect(calculateReadingTime(text)).toBe(2);
  });

  it("returns 0 for empty text", () => {
    expect(calculateReadingTime("")).toBe(0);
  });

  it("returns 0 for whitespace-only text", () => {
    expect(calculateReadingTime("   \n\t  ")).toBe(0);
  });

  it("strips markdown headings", () => {
    const text = "# Heading\n" + Array(199).fill("word").join(" ");
    expect(calculateReadingTime(text)).toBe(1);
  });

  it("strips markdown links but keeps link text", () => {
    const text =
      Array(199).fill("word").join(" ") + " [click here](https://example.com)";
    expect(calculateReadingTime(text)).toBe(2);
  });

  it("strips code blocks entirely", () => {
    const text =
      Array(200).fill("word").join(" ") +
      "\n```typescript\nconst x = 1;\nconst y = 2;\n```";
    expect(calculateReadingTime(text)).toBe(1);
  });

  it("strips inline code", () => {
    const text = Array(199).fill("word").join(" ") + " `code`";
    expect(calculateReadingTime(text)).toBe(1);
  });

  it("strips images", () => {
    const text = Array(200).fill("word").join(" ") + "\n![alt text](image.png)";
    expect(calculateReadingTime(text)).toBe(1);
  });

  it("strips emphasis markers", () => {
    const text = Array(200).fill("**bold**").join(" ");
    expect(calculateReadingTime(text)).toBe(1);
  });

  it("strips blockquotes", () => {
    const text = "> " + Array(200).fill("word").join(" ");
    expect(calculateReadingTime(text)).toBe(1);
  });
});
