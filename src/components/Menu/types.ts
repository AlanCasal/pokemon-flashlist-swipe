import type { SupportedLanguage } from '@/src/i18n/language';

export interface LanguageMenuProps {
	onBack: () => void;
	onClose: () => void;
	onLanguagePress: (language: SupportedLanguage) => void;
}

export interface RootMenuProps {
	onClose: () => void;
	onOpenLanguagesMenu: () => void;
}
