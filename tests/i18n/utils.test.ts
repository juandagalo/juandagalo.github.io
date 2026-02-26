import { describe, it, expect } from "vitest";
import {
  getLangFromUrl,
  useTranslations,
  getPathWithoutLang,
} from "@/i18n/utils";

describe("getLangFromUrl", () => {
  it("returns 'es' for Spanish URLs", () => {
    const url = new URL("https://example.com/es/about");
    expect(getLangFromUrl(url)).toBe("es");
  });

  it("returns 'en' for English URLs", () => {
    const url = new URL("https://example.com/en/about");
    expect(getLangFromUrl(url)).toBe("en");
  });

  it("returns default lang for root URL", () => {
    const url = new URL("https://example.com/");
    expect(getLangFromUrl(url)).toBe("en");
  });

  it("returns default lang for unknown locale", () => {
    const url = new URL("https://example.com/fr/about");
    expect(getLangFromUrl(url)).toBe("en");
  });
});

describe("useTranslations", () => {
  it("returns English translation", () => {
    const t = useTranslations("en");
    expect(t("nav.home")).toBe("Home");
  });

  it("returns Spanish translation", () => {
    const t = useTranslations("es");
    expect(t("nav.home")).toBe("Inicio");
  });

  it("returns all expected keys", () => {
    const t = useTranslations("en");
    expect(t("hero.greeting")).toBe("Hi, I'm");
    expect(t("footer.rights")).toBe("All rights reserved.");
  });
});

describe("getPathWithoutLang", () => {
  it("strips language prefix from path", () => {
    expect(getPathWithoutLang("/es/about")).toBe("/about");
  });

  it("strips 'en' prefix from path", () => {
    expect(getPathWithoutLang("/en/projects")).toBe("/projects");
  });

  it("returns path unchanged if no lang prefix", () => {
    expect(getPathWithoutLang("/about")).toBe("/about");
  });

  it("handles root lang path", () => {
    expect(getPathWithoutLang("/es/")).toBe("/");
  });
});
