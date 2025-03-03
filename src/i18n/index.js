// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
i18n.use(initReactI18next).init({
    resources: {
    // en: { translation: en },
    // tr: { translation: tr },
    },
    lng: 'tr', // Varsayılan dil
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});
export default i18n;
