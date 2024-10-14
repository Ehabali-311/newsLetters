import i18n from 'i18next';
import i18nextBrowserLanguagedetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
// change direction of the app
i18n.on('languageChanged', (lng) => {   
  const direction = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', direction);
});
i18n.use(initReactI18next)
// to take the language from the url
.use(I18NextHttpBackend)
// to detect the language
.use(i18nextBrowserLanguagedetector)
.init({
  fallbackLng: 'en',
  detection: {
    order: ["path"], 
    caches : ["cookie"],
  },
});
export default i18n;
