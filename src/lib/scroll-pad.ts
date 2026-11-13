/**
 * `--scroll-pad` = height of the sticky header + a small gap. CSS uses it for
 * `scroll-padding-top`, so anchor jumps don't hide headings under the header.
 */
export const SCROLL_PAD_VAR = "--scroll-pad";
export const SCROLL_PAD_GAP_PX = 12;
export const SCROLL_PAD_FALLBACK_PX = 154;
/** Ignore measurements taken before layout settles. */
const MIN_HEADER_PX = 60;

export function readScrollPad(root: HTMLElement = document.documentElement): number {
  const value = parseFloat(getComputedStyle(root).getPropertyValue(SCROLL_PAD_VAR));
  return Number.isFinite(value) ? value : SCROLL_PAD_FALLBACK_PX;
}

/** Computes the pad for a header height, or null if the height is not plausible yet. */
export function scrollPadFor(headerHeight: number): number | null {
  const pad = Math.ceil(headerHeight) + SCROLL_PAD_GAP_PX;
  return pad < MIN_HEADER_PX ? null : pad;
}

export function syncScrollPad(header: Element | null, root: HTMLElement = document.documentElement): void {
  if (!header) return;
  const pad = scrollPadFor(header.getBoundingClientRect().height);
  if (pad !== null) root.style.setProperty(SCROLL_PAD_VAR, `${pad}px`);
}

/**
 * Id of the section whose top is closest above the header line, regardless of
 * the order of `ids` (menu order differs from page order: "contacts" is last in
 * the menu but near the top of the page). `fallback` is returned while the page
 * is above every tracked section.
 */
export function findActiveSection(ids: readonly string[], scrollY: number, pad: number, fallback: string): string {
  const y = scrollY + pad;
  let current = fallback;
  let currentTop = -Infinity;
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= y && el.offsetTop > currentTop) {
      current = id;
      currentTop = el.offsetTop;
    }
  }
  return current;
}
