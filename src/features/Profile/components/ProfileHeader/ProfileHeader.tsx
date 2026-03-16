import BackButton from '@components/common/BackButton';
import { textColor } from '@constants/colors';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ActivityIndicator, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import Dots from '@/src/components/common/Dots';

import { useStyles } from './styles';
import type { ProfileHeaderProps } from './types';

const GENERATION_SHEET_DOTS_SIZE = 200;
const PROFILE_FALLBACK_ICON_SIZE = 52;

const ProfileHeader = ({
	compactTitleStyle,
	displayName,
	heroImageUrl,
	heroStyle,
	isProfileLoading,
	secondaryText,
}: ProfileHeaderProps) => {
	const styles = useStyles();

	return (
		<>
			<BackButton />

			<Animated.Text
				style={[styles.compactTitle, compactTitleStyle]}
				numberOfLines={1}
			>
				{displayName}
			</Animated.Text>

			<Animated.View style={[styles.heroContent, heroStyle]}>
				<Dots
					size={GENERATION_SHEET_DOTS_SIZE}
					color={textColor.light}
					position={{ right: -20, top: -80 }}
				/>

				<View style={styles.heroImageSlot}>
					{heroImageUrl ? (
						<Image
							testID='profile-hero-avatar'
							source={{ uri: heroImageUrl }}
							style={styles.avatarImage}
							contentFit='cover'
						/>
					) : (
						<View style={styles.heroLoadingFallback}>
							{isProfileLoading ? (
								<ActivityIndicator
									size='small'
									color={textColor.light}
								/>
							) : (
								<View style={styles.avatarFallback}>
									<MaterialCommunityIcons
										name='account'
										size={PROFILE_FALLBACK_ICON_SIZE}
										color={textColor.light}
									/>
								</View>
							)}
						</View>
					)}
				</View>

				<View style={styles.heroTextBlock}>
					<Text
						testID='profile-hero-name'
						style={styles.heroName}
						numberOfLines={1}
						adjustsFontSizeToFit
					>
						{displayName}
					</Text>

					{secondaryText ? (
						<Text
							testID='profile-hero-secondary'
							style={styles.heroSecondary}
							numberOfLines={1}
							adjustsFontSizeToFit
						>
							{secondaryText}
						</Text>
					) : null}
				</View>
			</Animated.View>
		</>
	);
};

export default ProfileHeader;
