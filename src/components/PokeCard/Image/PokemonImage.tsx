import { pokeballColors } from '@constants/colors';
import {
	POKE_CARD_HEIGHT,
	POKE_IMAGE_SIZE,
	SVG_DEFAULT_OPACITY,
} from '@constants/sharedStyles';
import { Image } from 'expo-image';
import Pokeball from '@assets/images/pokeball-full.svg';
import { View } from 'react-native';

const POKEBALL_SIZE = POKE_CARD_HEIGHT - 10;

interface PokemonImageProps {
	uri: string;
	isSaved?: boolean;
}

const PokemonImage = ({ uri, isSaved = false }: PokemonImageProps) => {
	const colors = {
		opacity: SVG_DEFAULT_OPACITY,
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
					width: POKE_IMAGE_SIZE,
					height: POKE_IMAGE_SIZE,
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
