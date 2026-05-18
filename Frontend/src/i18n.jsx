import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 👈 ایمپورت مستقیم فایل‌های ترجمه از پوشه public
import translationEN from '../public/locales/en/translation.json';
import translationFA from '../public/locales/fa/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  fa: {
    translation: translationFA
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fa', // زبان پیش‌فرض
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'appLanguage',
    },
    react: {
      useSuspense: false, // 👈 کاملاً غیرفعال شد تا ری‌آکت منتظر هیچ پرامیسی نماند
    }
  });

export default i18n;