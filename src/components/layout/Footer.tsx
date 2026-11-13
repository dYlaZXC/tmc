import type { Phone, SocialLinks } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { Brand } from "./Brand";
import { SocialLink } from "./SocialLink";

interface FooterProps {
  t: Dictionary;
  phones: readonly Phone[];
  social: SocialLinks;
}

export function Footer({ t, phones, social }: FooterProps) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          <div>
            <Brand t={t} />
            <p className="foot-lead">{t.footLead}</p>
          </div>
          <div>
            <h2 className="foot-heading">{t.footPhones}</h2>
            {phones.map((phone) => (
              <p key={phone.id} className="foot-numbers">
                <a href={`tel:${phone.tel}`}>
                  {phone.label}: {phone.display}
                </a>
              </p>
            ))}
            <p>{t.footSchedule}</p>
          </div>
          <div>
            <h2 className="foot-heading">{t.footNav}</h2>
            <p>
              <a href="#about">{t.navAbout}</a> · <a href="#consultations">{t.navConsult}</a>
            </p>
            <p>
              <a href="#work">{t.navProcess}</a> · <a href="#faq">{t.navFaq}</a>
            </p>
            <p>
              <a href="#contacts">{t.navContacts}</a>
            </p>
            <div className="footer-socials">
              <SocialLink url={social.instagram} soonMessage={t.igSoon}>
                Instagram
              </SocialLink>
              <SocialLink url={social.whatsapp} soonMessage={t.waSoon}>
                WhatsApp
              </SocialLink>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t.footCopy}</span>
          <span>{t.footNote}</span>
        </div>
      </div>
    </footer>
  );
}
