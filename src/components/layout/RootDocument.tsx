import type { ReactNode } from "react";
import type { Locale } from "@/i18n";
import "@/styles/base.css";
import "@/styles/header.css";
import "@/styles/hero.css";
import "@/styles/contacts.css";
import "@/styles/sections.css";
import "@/styles/faq.css";
import "@/styles/footer.css";
import "@/styles/responsive.css";

/** `<html>`/`<body>` shell shared by every root layout. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
