import type { Dictionary } from "@/i18n";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHead } from "./SectionHead";

export function Consultations({ t }: { t: Dictionary }) {
  const items: Array<{ icon: IconName; title: string; text: string; tag: string }> = [
    { icon: "stethoscopeLine", title: t.c1Title, text: t.c1Text, tag: t.c1Tag },
    { icon: "medicalCross", title: t.c2Title, text: t.c2Text, tag: t.c2Tag },
    { icon: "document", title: t.c3Title, text: t.c3Text, tag: t.c3Tag },
    { icon: "clock", title: t.c4Title, text: t.c4Text, tag: t.c4Tag },
  ];

  return (
    <section className="section white" id="consultations">
      <div className="wrap">
        <SectionHead label={t.consultNo} title={t.consultTitle} intro={t.consultIntro} />
        <div className="consults">
          {items.map((item) => (
            <article key={item.icon} className="consult">
              <div className="consult-icon" aria-hidden="true">
                <Icon name={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="consult-tag">{item.tag}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
