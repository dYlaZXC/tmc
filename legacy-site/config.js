/**
 * Редактируемая конфигурация контактов и соцсетей.
 * Instagram / WhatsApp: вставьте официальные URL после подтверждения Центром.
 * На сайте публикуются только мобильные номера из массива phones (без городских линий).
 */
window.TMC_SITE = {
  social: {
    /** Например: https://www.instagram.com/tmc_almaty/ */
    instagram: "",
    /** Например: https://wa.me/77015021312 */
    whatsapp: "https://wa.me/77005501312"
  },

  phones: [
    { id: "activ", label: "Activ", display: "+7 701 502 13 12", tel: "+77015021312" },
    { id: "altel", label: "Altel", display: "+7 700 550 13 12", tel: "+77005501312" },
    {
      id: "beeline",
      label: "Beeline — для абонентов Beeline",
      labelShort: "Beeline",
      display: "+7 702 502 13 12",
      tel: "+77025021312"
    }
  ]
};
