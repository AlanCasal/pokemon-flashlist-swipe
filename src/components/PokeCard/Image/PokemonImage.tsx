import Pokeball from '@assets/images/pokeball-full.svg';
import { pokeballColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { Image } from 'expo-image';
import { View } from 'react-native';

const POKEBALL_SIZE = sharedStyles.dimensions.pokeCardHeight - 10;

import type { PokemonImageProps } from './types';

const PokemonImage = ({ uri, isSaved = false }: PokemonImageProps) => {
	const colors: { opacity: number; fillColor: string } = {
		opacity: sharedStyles.opacity.svgDefault,
		fillColor: pokeballColors.white,
	};

	if (isSaved) {
		colors.opacity = 1;
		colors.fillColor = pokeballColors.red;
	}

	return (
		<View>
			<Image
				source={{ uri }}
				style={{
					width: sharedStyles.dimensions.pokeImageSize,
					height: sharedStyles.dimensions.pokeImageSize,
					bottom: 10,
					zIndex: 1,
				}}
			/>
			<View className='absolute top-4 left-[10px]'>
				<Pokeball
					width={POKEBALL_SIZE}
					height={POKEBALL_SIZE}
					fill={colors.fillColor}
					fillOpacity={colors.opacity}
				/>
			</View>
		</View>
	);
};

export default PokemonImage;
