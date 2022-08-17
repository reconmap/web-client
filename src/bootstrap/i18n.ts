import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import COMMON_TRANSLATIONS_EN from 'translations/en/common.json';
import COMMON_TRANSLATIONS_ES from 'translations/es/common.json';

i18next
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        resources: {
            en: {
                common: COMMON_TRANSLATIONS_EN
            },
            es: {
                common: COMMON_TRANSLATIONS_ES
            }
        }
    });
