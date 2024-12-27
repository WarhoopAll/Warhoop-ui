import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpApi from 'i18next-http-backend';

let language = localStorage.getItem('language');
if (!language) {
    const userLanguage = navigator.language;
    language = userLanguage.startsWith('ru') ? 'ru' : 'en';
    localStorage.setItem('language', language);
}

i18n
    .use(initReactI18next)
    .use(HttpApi)
    .init({
        lng: language, fallbackLng: 'ru', backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        }, interpolation: {
            escapeValue: false,
        }, react: {
            useSuspense: false,
        },
    });

export default i18n;
