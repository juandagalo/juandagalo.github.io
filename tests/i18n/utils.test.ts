import { describe, it, expect } from "vitest";
import {
  getLangFromUrl,
  useTranslations,
  getPathWithoutLang,
} from "@/i18n/utils";

describe("getLangFromUrl", () => {
  it("returns 'en' for unprefixed paths", () => {
    const url = new URL("https://example.com/projects");
    expect(getLangFromUrl(url)).toBe("en");
  });

  it("returns 'es' for /es/ prefixed paths", () => {
    const url = new URL("https://example.com/es/projects");
    expect(getLangFromUrl(url)).toBe("es");
  });

  it("returns 'es' for /es/ root", () => {
    const url = new URL("https://example.com/es/");
    expect(getLangFromUrl(url)).toBe("es");
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
  it("returns English translation for nav.home", () => {
    const t = useTranslations("en");
    expect(t("nav.home")).toBe("Home");
  });

  it("returns Spanish translation for nav.home", () => {
    const t = useTranslations("es");
    expect(t("nav.home")).toBe("Inicio");
  });

  it("returns hero keys correctly", () => {
    const tEn = useTranslations("en");
    const tEs = useTranslations("es");
    expect(tEn("hero.greeting")).toBe("Hi, I'm");
    expect(tEs("hero.greeting")).toBe("Hola, soy");
    expect(tEn("hero.cta.projects")).toBe("View my work");
    expect(tEs("hero.cta.projects")).toBe("Ver mi trabajo");
  });

  it("returns footer keys correctly", () => {
    const t = useTranslations("en");
    expect(t("footer.builtWith")).toBe("Built with");
    expect(t("footer.sourceCode")).toBe("Source code");
    expect(t("footer.rights")).toBe("All rights reserved.");
  });

  it("returns project badge keys correctly", () => {
    const t = useTranslations("es");
    expect(t("projects.badge.wip")).toBe("En progreso");
    expect(t("projects.label.featured")).toBe("Destacado");
  });
});

describe("getPathWithoutLang", () => {
  it("strips /es/ prefix from path", () => {
    expect(getPathWithoutLang("/es/projects")).toBe("/projects");
  });

  it("strips /en/ prefix from path", () => {
    expect(getPathWithoutLang("/en/projects")).toBe("/projects");
  });

  it("returns path unchanged if no lang prefix", () => {
    expect(getPathWithoutLang("/projects")).toBe("/projects");
  });

  it("handles root lang path", () => {
    expect(getPathWithoutLang("/es/")).toBe("/");
  });
});
