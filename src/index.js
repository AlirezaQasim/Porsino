import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // برای بارگیری ترجمه‌ها از فایل
  .use(LanguageDetector) // برای تشخیص زبان کاربر از مرورگر
  .use(initReactI18next) // اتصال i18next به React
  .init({
    fallbackLng: 'en', // زبان پیش‌فرض در صورت عدم تشخیص یا عدم وجود ترجمه
    debug: true, // برای نمایش لاگ‌های مربوط به i18next در کنسول (در حالت توسعه)
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // مسیر فایل‌های ترجمه
    },
    interpolation: {
      escapeValue: false, // React در برابر XSS محافظت می‌کند، نیازی به فرار دادن مقادیر نیست
    },
  });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
export default i18n;