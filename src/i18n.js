import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development', // فقط در حالت توسعه لاگ‌ها را نشان بده

        backend: {
            loadPath: '/locales/{{lng}}/translation.json', // فایل‌های ترجمه ما translation.json نام دارند
        },

        interpolation: {
            escapeValue: false, // React خودش از XSS محافظت می‌کنه
        },

        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'appLanguage', // کلید ذخیره زبان در localStorage
        },

        react: {
            useSuspense: false, // اگر از React Suspense برای بارگیری ترجمه‌ها استفاده نمی‌کنید
        },
    });

export default i18n;