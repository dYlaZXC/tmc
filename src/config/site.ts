/**
 * Editable contacts and social links.
 *
 * - Only mobile numbers are published (no landlines).
 * - Leave a social URL empty to show the button as "coming soon"; clicking it
 *   then explains that the link will be added after the Center confirms it.
 */

export interface Phone {
  id: string;
  /** Operator name, e.g. "Activ". */
  label: string;
  /** The number only accepts calls from this operator's subscribers. */
  isOperatorOnly?: boolean;
  /** Human-readable number, e.g. "+7 701 502 13 12". */
  display: string;
  /** E.164 number used in the `tel:` link, e.g. "+77015021312". */
  tel: string;
}

export interface SocialLinks {
  /** e.g. https://www.instagram.com/<account>/ */
  instagram: string;
  /** e.g. https://wa.me/77005501312 */
  whatsapp: string;
}

export interface SiteConfig {
  url: string;
  social: SocialLinks;
  phones: readonly Phone[];
}

export const SITE: SiteConfig = {
  url: "https://tmc24.kz",
  social: {
    instagram: "",
    whatsapp: "https://wa.me/77005501312",
  },
  phones: [
    { id: "activ", label: "Activ", display: "+7 701 502 13 12", tel: "+77015021312" },
    { id: "altel", label: "Altel", display: "+7 700 550 13 12", tel: "+77005501312" },
    { id: "beeline", label: "Beeline", isOperatorOnly: true, display: "+7 702 502 13 12", tel: "+77025021312" },
  ],
};
