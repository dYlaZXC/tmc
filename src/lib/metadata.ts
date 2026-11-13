import type { Metadata, Viewport } from "next";
import { SITE } from "@/config/site";
import { DEFAULT_LOCALE, LOCALES, getDictionary, localePath, type Locale } from "@/i18n";

const OG_LOCALES: Readonly<Record<Locale, string>> = {
  ru: "ru_RU",
  kk: "kk_KZ",
  en: "en_US",
};

const OG_IMAGE = "/assets/hero.jpg";
const THEME_COLOR = "#14394c";

export const VIEWPORT: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR,
};

/** hreflang map for every locale plus `x-default` (the root page). */
export function languageAlternates(): Record<string, string> {
  const entries = LOCALES.map((locale) => [locale, localePath(locale)] as const);
  return { ...Object.fromEntries(entries), "x-default": localePath(DEFAULT_LOCALE) };
}

export function buildMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  const path = localePath(locale);

  return {
    metadataBase: new URL(SITE.url),
    title: t.pageTitle,
    description: t.metaDesc,
    alternates: {
      canonical: path,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: t.pageTitle,
      title: t.pageTitle,
      description: t.metaDesc,
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
      images: [{ url: OG_IMAGE, width: 1448, height: 1086, alt: t.pageTitle }],
    },
    icons: {
      icon: [
        { url: "/assets/favicon-32.png", type: "image/png", sizes: "32x32" },
        { url: "/assets/favicon-16.png", type: "image/png", sizes: "16x16" },
      ],
      apple: "/assets/apple-touch-icon.png",
    },
  };
}
