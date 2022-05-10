import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import sv from "./locales/sv";

const resources = {
  sv: sv,
  en: en,
};

const fallbackLng = "en";

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: fallbackLng,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
});
window.i18n = i18n;
export default i18n;
