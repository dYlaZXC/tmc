import Image from "next/image";
import type { Dictionary } from "@/i18n";
import { Lines } from "@/components/ui/Lines";

const LOGO_SRC = "/assets/tmc-logo.png";
const LOGO_SIZE = 52;

export function Brand({ t }: { t: Dictionary }) {
  return (
    <a className="brand" href="#top">
      <Image className="logo" src={LOGO_SRC} width={LOGO_SIZE} height={LOGO_SIZE} alt="" />
      <span>
        <span className="brand-name">
          <Lines lines={t.brandName} />
        </span>
        <span className="brand-sub">{t.brandSub}</span>
      </span>
    </a>
  );
}
