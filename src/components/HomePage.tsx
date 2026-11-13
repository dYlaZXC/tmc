import { SITE } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { About } from "./sections/About";
import { Consultations } from "./sections/Consultations";
import { Contacts } from "./sections/Contacts";
import { Faq } from "./sections/Faq";
import { Goals } from "./sections/Goals";
import { Hero } from "./sections/Hero";
import { QuickCards } from "./sections/QuickCards";
import { ResidentNote } from "./sections/ResidentNote";
import { Specialists } from "./sections/Specialists";
import { Workflow } from "./sections/Workflow";

/** The whole single-page site for one language. */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <a className="skip-link" href="#top">
        {t.skipToContent}
      </a>
      <Header t={t} locale={locale} social={SITE.social} />
      <main id="top" tabIndex={-1}>
        <Hero t={t} />
        <Contacts t={t} phones={SITE.phones} />
        <QuickCards t={t} />
        <About t={t} />
        <Goals t={t} />
        <Consultations t={t} />
        <Specialists t={t} />
        <Workflow t={t} />
        <Faq t={t} />
        <ResidentNote t={t} />
      </main>
      <Footer t={t} phones={SITE.phones} social={SITE.social} />
    </>
  );
}
