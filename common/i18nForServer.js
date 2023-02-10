import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// i18n for ssr
export default function initI18n(lang) {
  // fetch lang resource
  const resource = require(`../public/locales/${lang}/translation.json`)
  i18n
    .use(initReactI18next)
    .init({
      debug: false,
      lng: lang,
      fallbackLng: lang,
      interpolation: {
        escapeValue: false,
      },
      resources: {
        [lang]: {
          translation: resource
        }
      }
    })
}