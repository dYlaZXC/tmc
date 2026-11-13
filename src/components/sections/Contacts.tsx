import type { Phone } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { Icon } from "@/components/ui/Icon";

interface ContactsProps {
  t: Dictionary;
  phones: readonly Phone[];
}

/** "Beeline — для абонентов Beeline" for operator-only numbers, else just the operator. */
export function phoneLabel(phone: Phone, t: Dictionary): string {
  if (!phone.isOperatorOnly) return phone.label;
  return `${phone.label} — ${t.phoneOperatorOnly.replace("{operator}", phone.label)}`;
}

/** The only place (besides the footer) where the Center's phones are published. */
export function Contacts({ t, phones }: ContactsProps) {
  return (
    <section className="alert-wrap" id="contacts" aria-labelledby="contacts-title">
      <div className="wrap">
        <div className="alert is-normal">
          <div className="alert-icon" aria-hidden="true">
            <Icon name="phone" size={22} strokeWidth={2} />
          </div>
          <div>
            <h2 id="contacts-title">{t.contactsTitle}</h2>
            <p>{t.contactsIntro}</p>
            <div className="nums">
              {phones.map((phone) => (
                <a key={phone.id} className="num" href={`tel:${phone.tel}`}>
                  <span>
                    <span className="num-label">{phoneLabel(phone, t)}</span>
                    <strong>{phone.display}</strong>
                  </span>
                  <em>{t.phoneCall}</em>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
