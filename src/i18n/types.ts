import type { ru } from "./dictionaries/ru";

/** Shape of a full translation pack. Derived from the Russian source dictionary. */
export type Dictionary = typeof ru;

/** Keys whose value is plain text (excludes structured entries like `heroTitle`). */
export type TextKey = {
  [K in keyof Dictionary]: Dictionary[K] extends string ? K : never;
}[keyof Dictionary];
