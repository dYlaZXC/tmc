import type { Dictionary } from "@/i18n";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHead } from "./SectionHead";

export function Specialists({ t }: { t: Dictionary }) {
  const specialists: Array<{ icon: IconName; title: string; sub: string }> = [
    { icon: "adult", title: t.s1Title, sub: t.s1Sub },
    { icon: "medicalCross", title: t.s2Title, sub: t.s2Sub },
    { icon: "child", title: t.s3Title, sub: t.s3Sub },
    { icon: "female", title: t.s4Title, sub: t.s4Sub },
  ];

  return (
    <section className="section mist" id="specialists">
      <div className="wrap">
        <SectionHead label={t.specNo} title={t.specTitle} intro={t.specIntro} />
        <div className="specialists">
          {specialists.map((spec) => (
            <div key={spec.title} className="specialist">
              <div className="spec-avatar" aria-hidden="true">
                <Icon name={spec.icon} />
              </div>
              <div>
                <strong>{spec.title}</strong>
                <span>{spec.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
