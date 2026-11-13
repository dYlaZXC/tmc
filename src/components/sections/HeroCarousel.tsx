"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export const HERO_INTERVAL_MS = 5500;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const noopSubscribe = () => () => {};

/** false during SSR and hydration, true afterwards — without an extra effect render. */
function useIsHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

function subscribeReducedMotion(onChange: () => void): () => void {
  const query = window.matchMedia?.(REDUCED_MOTION_QUERY);
  query?.addEventListener?.("change", onChange);
  return () => query?.removeEventListener?.("change", onChange);
}

/** Live `prefers-reduced-motion: reduce` (false on the server). */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false,
    () => false,
  );
}

interface HeroCarouselProps {
  slides: readonly string[];
  intervalMs?: number;
}

/**
 * Cross-fading background photos. The first slide is server-rendered; the rest
 * get their image only after hydration so they don't compete with first paint.
 * With reduced motion the carousel stays on the first photo and the others are
 * never downloaded.
 */
export function HeroCarousel({ slides, intervalMs = HERO_INTERVAL_MS }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const isHydrated = useIsHydrated();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldRotate = slides.length > 1 && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldRotate) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), intervalMs);
    return () => clearInterval(timer);
  }, [shouldRotate, slides.length, intervalMs]);

  const visibleIndex = shouldRotate ? active : 0;

  return (
    <div className="hero-media" aria-hidden="true">
      {slides.map((src, index) => {
        const hasImage = index === 0 || (isHydrated && shouldRotate);
        return (
          <div
            key={src}
            className={index === visibleIndex ? "hero-slide is-active" : "hero-slide"}
            style={hasImage ? { backgroundImage: `url('${src}')` } : undefined}
          />
        );
      })}
      <div className="hero-overlay" />
    </div>
  );
}
