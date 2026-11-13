import type { Dictionary } from "@/i18n";
import { FaqList, type FaqItem } from "./FaqList";

export function Faq({ t }: { t: Dictionary }) {
  const items: FaqItem[] = [
    { question: t.faq1q, answer: t.faq1a },
    { question: t.faq2q, answer: t.faq2a },
    { question: t.faq3q, answer: t.faq3a },
    { question: t.faq4q, answer: t.faq4a },
    { question: t.faq5q, answer: t.faq5a },
  ];

  return (
    <section className="section mist" id="faq">
      <div className="wrap faq-grid">
        <div className="faq-side">
          <p className="faq-side-title">{t.faqSideTitle}</p>
          <p>{t.faqSideText}</p>
          <a className="btn" href="#contacts">
            {t.faqSideCta}
          </a>
        </div>
        <div>
          <span className="section-no">{t.faqNo}</span>
          <h2 className="faq-title">{t.faqTitle}</h2>
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}
