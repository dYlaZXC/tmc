import { Lines } from "@/components/ui/Lines";

interface SectionHeadProps {
  /** Small numbered label, e.g. "01 / Миссия". */
  label: string;
  title: string | readonly string[];
  intro: string;
}

export function SectionHead({ label, title, intro }: SectionHeadProps) {
  return (
    <div className="section-head">
      <div>
        <span className="section-no">{label}</span>
        <h2>{typeof title === "string" ? title : <Lines lines={title} />}</h2>
      </div>
      <p className="section-intro">{intro}</p>
    </div>
  );
}
