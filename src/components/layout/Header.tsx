import type { SocialLinks } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";
import { Icon, WhatsAppIcon } from "@/components/ui/Icon";
import { Brand } from "./Brand";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavLinks, type NavItem } from "./NavLinks";
import { ScrollPadSync } from "./ScrollPadSync";
import { SocialLink } from "./SocialLink";

interface HeaderProps {
  t: Dictionary;
  locale: Locale;
  social: SocialLinks;
}

function navItems(t: Dictionary): NavItem[] {
  return [
    { id: "top", label: t.navHome },
    { id: "about", label: t.navAbout },
    { id: "consultations", label: t.navConsult },
    { id: "work", label: t.navProcess },
    { id: "faq", label: t.navFaq },
    { id: "contacts", label: t.navContacts },
  ];
}

function UtilityBar({ t, locale }: Omit<HeaderProps, "social">) {
  return (
    <div className="utility">
      <div className="wrap inner">
        <div className="utility-left">
          <span className="mini">
            <Icon name="clock" size={15} strokeWidth={2} />
            <strong>{t.aroundClock}</strong>
          </span>
        </div>
        <div className="utility-right">
          <LanguageSwitcher current={locale} ariaLabel={t.langAria} />
        </div>
      </div>
    </div>
  );
}

export function Header({ t, locale, social }: HeaderProps) {
  return (
    <>
      <UtilityBar t={t} locale={locale} />
      <header className="header">
        <div className="wrap header-main">
          <Brand t={t} />
          <div className="socials" role="group" aria-label={t.socialAria}>
            <SocialLink
              className="social"
              url={social.instagram}
              soonMessage={t.igSoon}
              title={t.igTitle}
              ariaLabel="Instagram"
            >
              <Icon name="instagram" />
              <span>Instagram</span>
            </SocialLink>
            <SocialLink
              className="social whatsapp"
              url={social.whatsapp}
              soonMessage={t.waSoon}
              title={t.waTitle}
              ariaLabel="WhatsApp"
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </SocialLink>
          </div>
        </div>
        <div className="nav">
          <div className="wrap inner">
            <NavLinks items={navItems(t)} ariaLabel={t.navAria} />
            <a className="nav-contact" href="#contacts">
              <span>{t.navContactCta}</span> <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <ScrollPadSync />
      </header>
    </>
  );
}
