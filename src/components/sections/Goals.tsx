import type { Dictionary } from "@/i18n";
import { SectionHead } from "./SectionHead";

export function Goals({ t }: { t: Dictionary }) {
  const goals = [
    { title: t.g1Title, text: t.g1Text },
    { title: t.g2Title, text: t.g2Text },
    { title: t.g3Title, text: t.g3Text },
    { title: t.g4Title, text: t.g4Text },
  ];

  return (
    <section className="section mist" id="goals">
      <div className="wrap">
        <SectionHead label={t.goalsNo} title={t.goalsTitle} intro={t.goalsIntro} />
        <div className="goals">
          {goals.map((goal, index) => (
            <article key={goal.title} className="goal">
              <span className="goal-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{goal.title}</h3>
              <p>{goal.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
