import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n";
import { buildMetadata, languageAlternates } from "@/lib/metadata";

describe("metadata", () => {
  it("lists every language plus x-default for hreflang", () => {
    expect(languageAlternates()).toEqual({ ru: "/", kk: "/kk/", en: "/en/", "x-default": "/" });
  });

  it("builds localized title, description, canonical and Open Graph", () => {
    const meta = buildMetadata("kk");
    const t = getDictionary("kk");
    expect(meta.title).toBe(t.pageTitle);
    expect(meta.description).toBe(t.metaDesc);
    expect(meta.alternates?.canonical).toBe("/kk/");
    expect(meta.metadataBase?.toString()).toBe("https://tmc24.kz/");
    expect(meta.openGraph).toMatchObject({ url: "/kk/", locale: "kk_KZ" });
    expect(meta.openGraph?.alternateLocale).toEqual(["ru_RU", "en_US"]);
  });
});
