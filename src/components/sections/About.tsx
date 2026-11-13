import type { Dictionary } from "@/i18n";
import { SectionHead } from "./SectionHead";

export function About({ t }: { t: Dictionary }) {
  return (
    <section className="section white" id="about">
      <div className="wrap">
        <SectionHead label={t.aboutNo} title={t.aboutTitle} intro={t.aboutIntro} />
        <div className="mission-box">
          <div>
            <h3>{t.missionH}</h3>
            <p>{t.missionP}</p>
          </div>
          <div className="mission-side">
            <div className="big">{t.missionBig}</div>
            <div className="small">{t.missionSmall}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
