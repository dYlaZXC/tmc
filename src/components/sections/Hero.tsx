import { preload } from "react-dom";
import type { Dictionary } from "@/i18n";
import { Icon } from "@/components/ui/Icon";
import { HeroCarousel } from "./HeroCarousel";

export const HERO_SLIDES = [
  "/assets/hero.webp",
  "/assets/hero-5.webp",
  "/assets/hero-4.webp",
  "/assets/hero-3.webp",
  "/assets/hero-1.webp",
  "/assets/hero-7.webp",
] as const;

function MedicalCard({ t }: { t: Dictionary }) {
  const rows = [t.mc1, t.mc2, t.mc3];
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="live-badge">
        <span className="live-dot" /> <span>{t.liveBadge}</span>
      </div>
      <div className="medical-card">
        <div className="mc-top">
          <div className="mc-icon">
            <Icon name="stethoscopeFull" />
          </div>
          <div>
            <div className="mc-title">{t.mcTitle}</div>
            <div className="mc-sub">{t.mcSub}</div>
          </div>
        </div>
        <div className="mc-rule" />
        {rows.map((row) => (
          <div key={row} className="mc-row">
            <span className="check">✓</span> <span>{row}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero({ t }: { t: Dictionary }) {
  preload(HERO_SLIDES[0], { as: "image", fetchPriority: "high" });

  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroCarousel slides={HERO_SLIDES} />
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">{t.heroBrand}</span>
          <h1 id="hero-title">
            {t.heroTitle.lead}
            <br />
            <span>{t.heroTitle.accent}</span>
          </h1>
          <p className="lead">{t.heroLead}</p>
          <div className="hero-actions">
            <a className="btn primary" href="#contacts">
              <Icon name="phone" strokeWidth={2} />
              <span>{t.ctaCall}</span>
            </a>
            <a className="btn secondary" href="#work">
              <span>{t.ctaWork}</span> <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="subnote">{t.heroSubnote}</p>
        </div>
        <MedicalCard t={t} />
      </div>
    </section>
  );
}
