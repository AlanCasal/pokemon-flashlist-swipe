import { View } from 'react-native';
import React, { lazy, Suspense } from 'react';
import { Image } from 'expo-image';
import {
	POKE_CARD_HEIGHT,
	POKEBALL_COLORS,
	SVG_DEFAULT_OPACITY,
} from '@/src/constants/sharedStyles';
import styles from './styles';

const Pokeball = lazy(() => import('@/assets/images/pokeball-full.svg'));
const POKEBALL_SIZE = POKE_CARD_HEIGHT - 10;

interface PokemonImageProps {
	uri: string;
	isSaved?: boolean;
}

const PokemonImage = ({ uri, isSaved = false }: PokemonImageProps) => {
	const pokeballColors = {
		opacity: SVG_DEFAULT_OPACITY,
		fillColor: POKEBALL_COLORS.white,
	};

	if (isSaved) {
		pokeballColors.opacity = 1;
		pokeballColors.fillColor = POKEBALL_COLORS.red;
	}

	return (
		<View>
			<Image source={{ uri }} style={styles.image} />
			<View style={styles.pokeballContainer}>
				<Suspense fallback={null}>
					<Pokeball
						width={POKEBALL_SIZE}
						height={POKEBALL_SIZE}
						fill={pokeballColors.fillColor}
						fillOpacity={pokeballColors.opacity}
					/>
				</Suspense>
			</View>
		</View>
	);
};

export default PokemonImage;
