import { type SupportedLanguage } from './language';

export const getPrimaryFontFamily = (language: SupportedLanguage) =>
	language === 'ja' ? undefined : 'FingerPaint_400Regular';
