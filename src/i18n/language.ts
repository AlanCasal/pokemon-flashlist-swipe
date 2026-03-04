import { getLocales } from 'expo-localization';

export const SUPPORTED_LANGUAGES = ['en', 'es', 'de', 'ja'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export type LanguagePreference = SupportedLanguage | 'system';

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export const isSupportedLanguage = (value: string): value is SupportedLanguage =>
	SUPPORTED_LANGUAGES.includes(value as SupportedLanguage);

export const resolveSupportedLanguage = (value: string | null | undefined): SupportedLanguage => {
	if (!value) return DEFAULT_LANGUAGE;

	const normalizedValue = value.trim().toLowerCase().replace('_', '-');
	const languageCandidate = normalizedValue.split('-')[0];

	return isSupportedLanguage(languageCandidate) ? languageCandidate : DEFAULT_LANGUAGE;
};

export const getDeviceLanguage = (): SupportedLanguage => {
	const locales = getLocales();
	const primaryLocale = locales[0];
	if (!primaryLocale) return DEFAULT_LANGUAGE;

	return resolveSupportedLanguage(primaryLocale.languageTag ?? primaryLocale.languageCode);
};

export const getResolvedLanguage = (preference: LanguagePreference): SupportedLanguage =>
	preference === 'system' ? getDeviceLanguage() : preference;

export const getLanguageLabel = (language: SupportedLanguage) => {
	const labels: Record<SupportedLanguage, string> = {
		en: 'English',
		es: 'Español',
		de: 'Deutsch',
		ja: '日本語',
	};

	return labels[language];
};
