"use client";

import type { MouseEvent } from "react";
import { LOCALES, LOCALE_LABELS, localePath, type Locale } from "@/i18n/locales";
import { navigateTo } from "@/lib/navigation";

interface LanguageSwitcherProps {
  current: Locale;
  ariaLabel: string;
}

/**
 * Each language is its own static page (`/`, `/kk/`, `/en/`).
 * On switch we keep the current `#section` so the reader stays where they were.
 */
export function LanguageSwitcher({ current, ariaLabel }: LanguageSwitcherProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>, locale: Locale) {
    const isPlainClick = !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
    if (!isPlainClick) return;
    event.preventDefault();
    if (locale === current) return;
    navigateTo(localePath(locale) + window.location.hash);
  }

  return (
    <div className="languages" role="group" aria-label={ariaLabel}>
      {LOCALES.map((locale) => {
        const isActive = locale === current;
        return (
          <a
            key={locale}
            className={isActive ? "lang active" : "lang"}
            href={localePath(locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={isActive ? "page" : undefined}
            onClick={(event) => handleClick(event, locale)}
          >
            {LOCALE_LABELS[locale]}
          </a>
        );
      })}
    </div>
  );
}
