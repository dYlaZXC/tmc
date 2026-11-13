import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ScrollPadSync } from "@/components/layout/ScrollPadSync";
import {
  SCROLL_PAD_FALLBACK_PX,
  readScrollPad,
  scrollPadFor,
  syncScrollPad,
} from "@/lib/scroll-pad";

function fakeHeader(height: number): HTMLElement {
  const header = document.createElement("header");
  header.className = "header";
  header.getBoundingClientRect = () => ({ height }) as DOMRect;
  document.body.appendChild(header);
  return header;
}

const pad = () => document.documentElement.style.getPropertyValue("--scroll-pad");

describe("scroll pad", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    document.documentElement.style.removeProperty("--scroll-pad");
    vi.useRealTimers();
  });

  it("adds a gap to the header height and rounds up", () => {
    expect(scrollPadFor(141.2)).toBe(154);
  });

  it("ignores implausibly small headers", () => {
    expect(scrollPadFor(20)).toBeNull();
    syncScrollPad(fakeHeader(20));
    expect(pad()).toBe("");
  });

  it("does nothing without a header", () => {
    syncScrollPad(null);
    expect(pad()).toBe("");
  });

  it("falls back when the CSS variable is missing", () => {
    expect(readScrollPad()).toBe(SCROLL_PAD_FALLBACK_PX);
    document.documentElement.style.setProperty("--scroll-pad", "120px");
    expect(readScrollPad()).toBe(120);
  });

  it("ScrollPadSync measures on mount, on resize and after rotation", () => {
    vi.useFakeTimers();
    const header = fakeHeader(140);
    const { unmount } = render(<ScrollPadSync />);
    expect(pad()).toBe("152px");

    header.getBoundingClientRect = () => ({ height: 100 }) as DOMRect;
    window.dispatchEvent(new Event("resize"));
    expect(pad()).toBe("112px");

    header.getBoundingClientRect = () => ({ height: 90 }) as DOMRect;
    window.dispatchEvent(new Event("orientationchange"));
    vi.advanceTimersByTime(60);
    expect(pad()).toBe("102px");

    unmount();
    header.getBoundingClientRect = () => ({ height: 200 }) as DOMRect;
    window.dispatchEvent(new Event("resize"));
    expect(pad()).toBe("102px");
  });
});
