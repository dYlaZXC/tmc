import type { Dictionary } from "@/i18n";
import { Icon, type IconName } from "@/components/ui/Icon";

export function QuickCards({ t }: { t: Dictionary }) {
  const cards: Array<{ icon: IconName; title: string; text: string }> = [
    { icon: "stethoscope", title: t.q1Title, text: t.q1Text },
    { icon: "chat", title: t.q2Title, text: t.q2Text },
    { icon: "monitoring", title: t.q3Title, text: t.q3Text },
  ];

  return (
    <section className="quick">
      <div className="wrap quick-grid">
        {cards.map((card) => (
          <article key={card.icon} className="quick-card">
            <div className="quick-icon" aria-hidden="true">
              <Icon name={card.icon} />
            </div>
            <div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
