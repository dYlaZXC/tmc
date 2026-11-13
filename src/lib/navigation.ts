/** Full-page navigation. Wrapped so components can be tested without jsdom navigation. */
export function navigateTo(url: string): void {
  window.location.assign(url);
}
