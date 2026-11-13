import type { Dictionary } from "@/i18n";
import { SectionHead } from "./SectionHead";

export function Workflow({ t }: { t: Dictionary }) {
  const steps = [
    { title: t.w1Title, text: t.w1Text },
    { title: t.w2Title, text: t.w2Text },
    { title: t.w3Title, text: t.w3Text },
    { title: t.w4Title, text: t.w4Text },
  ];

  return (
    <section className="section white" id="work">
      <div className="wrap">
        <SectionHead label={t.workNo} title={t.workTitle} intro={t.workIntro} />
        <ol className="workflow">
          {steps.map((step, index) => (
            <li key={step.title} className="step">
              <div className="step-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
