import type { DetailSheetTabConfig } from '@components/DetailSheet';
import type { TextStyle, ViewStyle } from 'react-native';
import type { AnimatedStyle } from 'react-native-reanimated';

export type ProfileTab = 'about' | 'collection' | 'badges';

export interface ProfileInfoRow {
	label: string;
	value: string;
}

export interface ProfileInfoSection {
	rows: ProfileInfoRow[];
	title: string;
}

export interface ProfileAboutData {
	sections: ProfileInfoSection[];
}

export interface ProfileHeaderProps {
	compactTitleStyle: AnimatedStyle<TextStyle>;
	displayName: string;
	heroImageUrl?: string | null;
	heroStyle: AnimatedStyle<ViewStyle>;
	isProfileLoading: boolean;
	secondaryText: string;
}

export interface ProfileAboutProps {
	data: ProfileAboutData;
	isLoading: boolean;
}

export interface ProfileController {
	activeTab: ProfileTab;
	aboutData: ProfileAboutData;
	displayName: string;
	heroImageUrl?: string | null;
	isProfileLoading: boolean;
	onTabPress: (tab: ProfileTab) => void;
	secondaryText: string;
	tabConfig: DetailSheetTabConfig<ProfileTab>[];
}
