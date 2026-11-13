import type { Dictionary } from "@/i18n";
import { Icon } from "@/components/ui/Icon";

export function ResidentNote({ t }: { t: Dictionary }) {
  return (
    <section className="section white">
      <div className="wrap">
        <div className="resident-note">
          <div className="resident-icon" aria-hidden="true">
            <Icon name="info" />
          </div>
          <div>
            <h3>{t.residentTitle}</h3>
            <p>{t.residentText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
