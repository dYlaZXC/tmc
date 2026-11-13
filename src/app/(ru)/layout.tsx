import type { ReactNode } from "react";
import { RootDocument } from "@/components/layout/RootDocument";
import { DEFAULT_LOCALE } from "@/i18n";
import { VIEWPORT, buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(DEFAULT_LOCALE);
export const viewport = VIEWPORT;

/** Root layout for the default (Russian) site served at `/`. */
export default function DefaultLocaleLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale={DEFAULT_LOCALE}>{children}</RootDocument>;
}
