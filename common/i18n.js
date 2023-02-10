import i18n from 'i18next';
import Backend from 'i18next-chained-backend';

import HttpApi from "i18next-http-backend";
import LocalStorageBackend from 'i18next-localstorage-backend';
import { initReactI18next } from 'react-i18next';
import { EN } from './constant';
// @ts-ignore
import Cookies from 'js-cookie'

export default function init(defaultLang) {
  // i18n for browser, fetch lang resource dynamiclly
  if (typeof window !== 'undefined') {
    const lang = defaultLang || Cookies.get('locale') || EN
    i18n
      .use(initReactI18next)
      .use(Backend)
      .init({
        debug: false,
        lng: lang,
        load: 'currentOnly',
        fallbackLng: lang,
        interpolation: {
          escapeValue: false,
        },
        backend: {
          backends: [
            LocalStorageBackend,  // primary backend
            HttpApi               // fallback backend
          ],
          backendOptions: [{
            expirationTime: 7 * 24 * 60 * 60 * 1000,
          }]
        }
      });
  }
}