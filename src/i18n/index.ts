import { en } from "./dictionaries/en";
import { kk } from "./dictionaries/kk";
import { ru } from "./dictionaries/ru";
import type { Locale } from "./locales";
import type { Dictionary } from "./types";

const DICTIONARIES: Readonly<Record<Locale, Dictionary>> = { ru, kk, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary, TextKey } from "./types";
export * from "./locales";
