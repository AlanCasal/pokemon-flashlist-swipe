import DetailSheet from '@components/DetailSheet';
import { typeColors } from '@constants/colors';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';

import ProfileHeader from './components/ProfileHeader';
import { useProfileController } from './hooks/useProfileController';
import { useStyles } from './styles';
import About from './tabs/About';
import type { ProfileTab } from './types';

const COLLAPSED_HERO_EXIT_OFFSET = -60;

const Profile = () => {
	const { t } = useTranslation();
	const styles = useStyles();
	const {
		activeTab,
		aboutData,
		displayName,
		heroImageUrl,
		isProfileLoading,
		onTabPress,
		secondaryText,
		tabConfig,
	} = useProfileController();
	const animatedSheetIndex = useSharedValue(0);
	const animatedSheetPosition = useSharedValue(0);

	const heroStyle = useAnimatedStyle(() => ({
		opacity: interpolate(animatedSheetIndex.value, [0, 1], [1, 0], Extrapolation.CLAMP),
		transform: [
			{
				translateY: interpolate(
					animatedSheetIndex.value,
					[0, 1],
					[0, COLLAPSED_HERO_EXIT_OFFSET],
					Extrapolation.CLAMP,
				),
			},
		],
	}));

	const compactTitleStyle = useAnimatedStyle(() => ({
		opacity: interpolate(animatedSheetIndex.value, [0, 0.5, 1], [0, 0.25, 1], Extrapolation.CLAMP),
		transform: [
			{
				translateY: interpolate(animatedSheetIndex.value, [0, 1], [14, 0], Extrapolation.CLAMP),
			},
		],
	}));

	const renderTabContent = (tab: ProfileTab) => {
		if (tab === 'about') {
			return (
				<About
					data={aboutData}
					isLoading={isProfileLoading}
				/>
			);
		}

		return (
			<View style={styles.placeholderContainer}>
				<Text style={styles.placeholderText}>{t('profile.wipMessage')}</Text>
			</View>
		);
	};

	return (
		<View style={[styles.container, { backgroundColor: typeColors.dragon }]}>
			<StatusBar
				style='light'
				backgroundColor={typeColors.dragon}
			/>

			<ProfileHeader
				compactTitleStyle={compactTitleStyle}
				displayName={displayName}
				heroImageUrl={heroImageUrl}
				heroStyle={heroStyle}
				isProfileLoading={isProfileLoading}
				secondaryText={secondaryText}
			/>

			<DetailSheet
				activeTab={activeTab}
				animatedSheetIndex={animatedSheetIndex}
				animatedSheetPosition={animatedSheetPosition}
				onTabPress={onTabPress}
				tabConfig={tabConfig}
			>
				{renderTabContent(activeTab)}
			</DetailSheet>
		</View>
	);
};

export default Profile;
