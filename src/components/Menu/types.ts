import type { SupportedLanguage } from '@/src/i18n/language';

export interface LanguageMenuProps {
	onBack: () => void;
	onClose: () => void;
	onLanguagePress: (language: SupportedLanguage) => void;
}

export interface RootMenuProps {
	isSigningOut: boolean;
	onClose: () => void;
	onOpenLanguagesMenu: () => void;
	onSignOut: () => void;
}

export interface SignOutButtonProps {
	disabled: boolean;
	onPress: () => void;
}
