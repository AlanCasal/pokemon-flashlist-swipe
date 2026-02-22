import Pokeball from '@assets/images/pokeball-full.svg';
import { pokeballColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { Image } from 'expo-image';
import { View } from 'react-native';

import styles from './styles';
import type { PokemonAvatarProps } from './types';

const DEFAULT_POKEBALL_SIZE = sharedStyles.dimensions.pokeCardHeight - 10;

const PokemonAvatar = ({
	contentFit,
	imageStyle,
	isSaved = false,
	pokeballContainerStyle,
	pokeballSize = DEFAULT_POKEBALL_SIZE,
	uri,
}: PokemonAvatarProps) => {
	const colors: { opacity: number; fillColor: string } = isSaved
		? {
				opacity: 1,
				fillColor: pokeballColors.red,
			}
		: {
				opacity: 0.2,
				fillColor: pokeballColors.white,
			};

	return (
		<View>
			<Image
				source={{ uri }}
				style={[styles.image, imageStyle]}
				contentFit={contentFit}
			/>
			<View style={[styles.pokeballContainer, pokeballContainerStyle]}>
				<Pokeball
					width={pokeballSize}
					height={pokeballSize}
					fill={colors.fillColor}
					fillOpacity={colors.opacity}
				/>
			</View>
		</View>
	);
};

export default PokemonAvatar;
