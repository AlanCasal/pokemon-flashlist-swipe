import type { SupportedLanguage } from '@/src/i18n/language';

export interface LanguageMenuProps {
	onBack: () => void;
	onClose: () => void;
	onLanguagePress: (language: SupportedLanguage) => void;
}

export interface RootMenuProps {
	isSigningOut: boolean;
	onClose: () => void;
	onOpenProfile: () => void;
	onOpenLanguagesMenu: () => void;
	onSignOut: () => void;
	showSignOut?: boolean;
}

export interface SignOutButtonProps {
	disabled: boolean;
	onPress: () => void;
}
