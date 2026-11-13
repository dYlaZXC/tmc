import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { RootDocument } from "@/components/layout/RootDocument";
import { PREFIXED_LOCALES, isLocale, type Locale } from "@/i18n";
import { VIEWPORT, buildMetadata } from "@/lib/metadata";

interface LangParams {
  params: Promise<{ lang: string }>;
}

/** Only the known locales are generated; anything else is a 404. */
export const dynamicParams = false;
export const viewport = VIEWPORT;

export function generateStaticParams(): Array<{ lang: Locale }> {
  return PREFIXED_LOCALES.map((lang) => ({ lang }));
}

async function resolveLocale(params: LangParams["params"]): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  return buildMetadata(await resolveLocale(params));
}

/** Root layout for `/kk/` and `/en/`. */
export default async function LocaleLayout({ children, params }: LangParams & { children: ReactNode }) {
  return <RootDocument locale={await resolveLocale(params)}>{children}</RootDocument>;
}
