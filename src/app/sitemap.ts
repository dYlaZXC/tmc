import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { LOCALES, localePath } from "@/i18n";
import { languageAlternates } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates()).map(([lang, path]) => [lang, SITE.url + path]),
  );
  return LOCALES.map((locale) => ({
    url: SITE.url + localePath(locale),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
