import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE } from './language';
import de from './locales/de';
import en from './locales/en';
import es from './locales/es';
import ja from './locales/ja';

// eslint-disable-next-line import/no-named-as-default-member
void i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		es: { translation: es },
		de: { translation: de },
		ja: { translation: ja },
	},
	lng: DEFAULT_LANGUAGE,
	fallbackLng: DEFAULT_LANGUAGE,
	interpolation: {
		escapeValue: false,
	},
	returnNull: false,
	compatibilityJSON: 'v4',
});

export default i18n;
