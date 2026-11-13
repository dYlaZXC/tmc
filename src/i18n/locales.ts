export const LOCALES = ["ru", "kk", "en"] as const;

export type Locale = (typeof LOCALES)[number];

/** Served at the site root (`/`); other locales live under `/<locale>/`. */
export const DEFAULT_LOCALE: Locale = "ru";

/** Locales that get a `/[lang]/` route (everything except the default). */
export const PREFIXED_LOCALES: readonly Locale[] = LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE,
);

/** Short labels for the language switcher, in display order. */
export const LOCALE_LABELS: Readonly<Record<Locale, string>> = {
  ru: "РУС",
  kk: "ҚАЗ",
  en: "ENG",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Site-relative path of a locale's home page, e.g. `/` or `/kk/`. */
export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}/`;
}
