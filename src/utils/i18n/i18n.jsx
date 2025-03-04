import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

let language = localStorage.getItem('language');

if (!language) {
    const userLanguage = navigator.language;
    if (userLanguage.startsWith('ru')) {
        language = 'ru';
    } else if (userLanguage.startsWith('en')) {
        language = 'en';
    } else {
        language = 'en';
    }
    localStorage.setItem('language', language);
}

i18n
    .use(initReactI18next)
    .use(HttpApi)
    .init({
        lng: language,
        fallbackLng: 'en',
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;