"use client";

import { useId, useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

/** Accordion: at most one answer is open at a time. */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="faqs">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `${baseId}-answer-${index}`;
        return (
          <div key={item.question} className={isOpen ? "faq open" : "faq"}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <span className="plus" aria-hidden="true">
                +
              </span>
            </button>
            <div className="faq-a" id={answerId} hidden={!isOpen}>
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
