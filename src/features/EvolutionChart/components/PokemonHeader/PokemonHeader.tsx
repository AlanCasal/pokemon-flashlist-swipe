import BackButton from '@components/common/BackButton';
import PokemonAvatar from '@components/common/PokemonAvatar';
import PokemonTypeChip from '@components/common/PokemonTypeChip';
import { textColor } from '@constants/colors';
import { ActivityIndicator, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import Dots from '@/src/components/common/Dots';

import { useStyles } from './styles';
import type { PokemonHeaderProps } from './types';

const GENERATION_SHEET_DOTS_SIZE = 200;

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
				<Dots
					size={GENERATION_SHEET_DOTS_SIZE}
					color={textColor.light}
					position={{ right: -20, top: -80 }}
				/>

				<View style={styles.heroImageSlot}>
					{heroImageUrl ? (
						<PokemonAvatar
							uri={heroImageUrl}
							isSaved={isSaved}
							centerImage
							imageStyle={styles.heroAvatarImage}
							contentFit='contain'
							pokeballSize={130}
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
					<Text
						style={styles.heroName}
						numberOfLines={1}
						adjustsFontSizeToFit
					>
						{displayName}
					</Text>

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
