import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  LOCALES,
  PREFIXED_LOCALES,
  getDictionary,
  isLocale,
  localePath,
} from "@/i18n";

function flatten(value: unknown, prefix = ""): Array<[string, string]> {
  if (typeof value === "string") return [[prefix, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => flatten(v, `${prefix}[${i}]`));
  return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
    flatten(v, prefix ? `${prefix}.${k}` : k),
  );
}

describe("dictionaries", () => {
  const ruKeys = flatten(getDictionary("ru")).map(([k]) => k);

  it.each(LOCALES)("%s has exactly the same keys as ru", (locale) => {
    const keys = flatten(getDictionary(locale)).map(([k]) => k);
    expect(keys).toEqual(ruKeys);
  });

  it.each(LOCALES)("%s has no empty strings and no leftover HTML", (locale) => {
    for (const [key, text] of flatten(getDictionary(locale))) {
      expect(text.trim(), `${locale}.${key}`).not.toBe("");
      expect(text, `${locale}.${key}`).not.toMatch(/<\/?[a-z][^>]*>/i);
    }
  });

  it("kk and en are actually translated, not copies of ru", () => {
    const ru = getDictionary("ru");
    expect(getDictionary("kk").heroLead).not.toBe(ru.heroLead);
    expect(getDictionary("en").heroLead).not.toBe(ru.heroLead);
  });
});

describe("locales", () => {
  it("serves russian at the root and prefixes the others", () => {
    expect(DEFAULT_LOCALE).toBe("ru");
    expect(PREFIXED_LOCALES).toEqual(["kk", "en"]);
    expect(localePath("ru")).toBe("/");
    expect(localePath("kk")).toBe("/kk/");
    expect(localePath("en")).toBe("/en/");
  });

  it("recognises only supported locales", () => {
    expect(isLocale("kk")).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
    expect(isLocale(42)).toBe(false);
  });
});
