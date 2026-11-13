"use client";

import { useEffect } from "react";
import { syncScrollPad } from "@/lib/scroll-pad";

const ORIENTATION_SETTLE_MS = 50;

/** Keeps `--scroll-pad` equal to the real sticky-header height. Renders nothing. */
export function ScrollPadSync({ headerSelector = ".header" }: { headerSelector?: string }) {
  useEffect(() => {
    const header = document.querySelector(headerSelector);
    const sync = () => syncScrollPad(header);
    let orientationTimer: ReturnType<typeof setTimeout> | undefined;
    const onOrientationChange = () => {
      clearTimeout(orientationTimer);
      orientationTimer = setTimeout(sync, ORIENTATION_SETTLE_MS);
    };

    sync();
    window.addEventListener("resize", sync);
    window.addEventListener("orientationchange", onOrientationChange);

    const observer = typeof ResizeObserver !== "undefined" && header ? new ResizeObserver(sync) : null;
    if (observer && header) observer.observe(header);

    return () => {
      clearTimeout(orientationTimer);
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", onOrientationChange);
      observer?.disconnect();
    };
  }, [headerSelector]);

  return null;
}
