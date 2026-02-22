import BackButton from '@components/common/BackButton';
import PokemonAvatar from '@components/common/PokemonAvatar';
import PokemonTypeChip from '@components/common/PokemonTypeChip';
import { textColor } from '@constants/colors';
import { isIos } from '@utils/helpers';
import { BlurView } from 'expo-blur';
import { ActivityIndicator, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useStyles } from './styles';
import type { PokemonHeaderProps } from './types';

const WATERMARK_IOS_BLUR_INTENSITY = 28;

const PokemonHeader = ({
	compactTitleStyle,
	displayName,
	formattedId,
	heroImageUrl,
	heroStyle,
	isPokemonLoading,
	isSaved,
	typeChips,
}: PokemonHeaderProps) => {
	const styles = useStyles();
	const uppercaseDisplayName = displayName.toUpperCase();

	return (
		<>
			<BackButton />

			{/* FIX: this is currently not displaying */}
			<Animated.Text
				style={[styles.compactTitle, compactTitleStyle]}
				numberOfLines={1}
			>
				{displayName}
			</Animated.Text>

			<Animated.View style={[styles.heroContent, heroStyle]}>
				<View
					pointerEvents='none'
					style={styles.heroWatermarkLayer}
				>
					<Text
						style={[styles.heroWatermarkTextBase, styles.heroWatermarkBlurSource]}
						numberOfLines={1}
					>
						{uppercaseDisplayName}
					</Text>

					{isIos && (
						<BlurView
							intensity={WATERMARK_IOS_BLUR_INTENSITY}
							tint='light'
							pointerEvents='none'
							style={styles.heroWatermarkBlurOverlay}
						/>
					)}

					<Text
						style={[styles.heroWatermarkTextBase, styles.heroWatermarkForeground]}
						numberOfLines={1}
					>
						{uppercaseDisplayName}
					</Text>
				</View>

				<View style={styles.heroImageSlot}>
					{heroImageUrl ? (
						<PokemonAvatar
							uri={heroImageUrl}
							isSaved={isSaved}
							imageStyle={styles.heroAvatarImage}
							contentFit='contain'
						/>
					) : (
						<View style={styles.heroLoadingFallback}>
							{isPokemonLoading && (
								<ActivityIndicator
									size='small'
									color={textColor.light}
								/>
							)}
						</View>
					)}
				</View>

				<View style={styles.heroTextBlock}>
					<Text style={styles.heroNumber}>{formattedId}</Text>
					<Text style={styles.heroName}>{displayName}</Text>

					<View style={styles.typeChipRow}>
						{typeChips.map(type => (
							<PokemonTypeChip
								key={type}
								type={type}
								containerStyle={styles.typeChip}
								labelStyle={styles.typeChipText}
								iconSize={14}
								iconFill={textColor.light}
							/>
						))}
					</View>
				</View>
			</Animated.View>
		</>
	);
};

export default PokemonHeader;
