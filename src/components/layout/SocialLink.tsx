"use client";

import type { MouseEvent, ReactNode } from "react";

interface SocialLinkProps {
  /** Empty string = link not confirmed yet; the button is shown disabled. */
  url: string;
  /** Explanation shown when a disabled link is clicked. */
  soonMessage: string;
  className?: string;
  title?: string;
  ariaLabel?: string;
  children: ReactNode;
}

function isSafeExternalUrl(url: string): boolean {
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

export function SocialLink({ url, soonMessage, className, title, ariaLabel, children }: SocialLinkProps) {
  if (isSafeExternalUrl(url)) {
    return (
      <a
        className={className}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  function handleDisabledClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.alert(soonMessage);
  }

  return (
    <a
      className={className ? `${className} is-disabled` : "is-disabled"}
      href="#"
      aria-disabled="true"
      title={title}
      aria-label={ariaLabel}
      onClick={handleDisabledClick}
    >
      {children}
    </a>
  );
}
