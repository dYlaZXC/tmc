"use client";

import { useEffect, useState } from "react";
import { findActiveSection, readScrollPad } from "@/lib/scroll-pad";

export interface NavItem {
  /** Section id without `#`. */
  id: string;
  label: string;
}

interface NavLinksProps {
  items: readonly NavItem[];
  ariaLabel: string;
  /** Id treated as active above the first tracked section. */
  topId?: string;
}

/** Section navigation that highlights the section currently under the header. */
export function NavLinks({ items, ariaLabel, topId = "top" }: NavLinksProps) {
  const [activeId, setActiveId] = useState(topId);

  useEffect(() => {
    const trackedIds = items.map((item) => item.id).filter((id) => id !== topId);
    const update = () => setActiveId(findActiveSection(trackedIds, window.scrollY, readScrollPad(), topId));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [items, topId]);

  return (
    <nav className="navlinks" aria-label={ariaLabel}>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={item.id === activeId ? "is-active" : undefined}
          aria-current={item.id === activeId ? "location" : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
