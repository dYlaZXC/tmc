import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/base.css";
import "@/styles/not-found.css";

export const metadata: Metadata = {
  title: "404 — Телемедицинский центр города Алматы",
  robots: { index: false },
};

/** Shown for any URL that matches no page (all three languages at once). */
export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body className="not-found">
        <main className="not-found-box">
          <p className="not-found-code">404</p>
          <h1>Страница не найдена</h1>
          <p lang="kk">Бет табылмады</p>
          <p lang="en">Page not found</p>
          <Link className="not-found-link" href="/">
            На главную · Басты бет · Home
          </Link>
        </main>
      </body>
    </html>
  );
}
