import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HeroCarousel } from "@/components/sections/HeroCarousel";

const SLIDES = ["/a.webp", "/b.webp", "/c.webp"];

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: reduce, media: query }));
}

function activeIndex(container: HTMLElement): number {
  return [...container.querySelectorAll(".hero-slide")].findIndex((el) =>
    el.classList.contains("is-active"),
  );
}

describe("HeroCarousel", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("rotates slides on an interval and wraps around", () => {
    mockReducedMotion(false);
    const { container } = render(<HeroCarousel slides={SLIDES} intervalMs={1000} />);
    expect(activeIndex(container)).toBe(0);

    act(() => vi.advanceTimersByTime(1000));
    expect(activeIndex(container)).toBe(1);

    act(() => vi.advanceTimersByTime(2000));
    expect(activeIndex(container)).toBe(0);
  });

  it("does not rotate or download extra photos when the user prefers reduced motion", () => {
    mockReducedMotion(true);
    const { container } = render(<HeroCarousel slides={SLIDES} intervalMs={1000} />);
    act(() => vi.advanceTimersByTime(5000));
    expect(activeIndex(container)).toBe(0);
    const withImage = [...container.querySelectorAll<HTMLElement>(".hero-slide")].filter(
      (el) => el.style.backgroundImage,
    );
    expect(withImage).toHaveLength(1);
  });

  it("does not start a timer for a single slide", () => {
    mockReducedMotion(false);
    const { container } = render(<HeroCarousel slides={["/only.webp"]} intervalMs={1000} />);
    act(() => vi.advanceTimersByTime(5000));
    expect(activeIndex(container)).toBe(0);
  });

  it("gives every slide its background image once hydrated", () => {
    mockReducedMotion(false);
    const { container } = render(<HeroCarousel slides={SLIDES} />);
    const backgrounds = [...container.querySelectorAll<HTMLElement>(".hero-slide")].map(
      (el) => el.style.backgroundImage,
    );
    expect(backgrounds).toEqual(SLIDES.map((src) => `url("${src}")`));
  });
});
