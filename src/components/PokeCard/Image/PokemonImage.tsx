import { View } from 'react-native';
import React, { lazy, Suspense } from 'react';
import { Image } from 'expo-image';
import {
	POKE_CARD_HEIGHT,
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
		strokeColor: 'transparent',
		strokeWidth: 0,
		fillColor: 'white',
	};

	if (isSaved) {
		pokeballColors.opacity = 1;
		pokeballColors.strokeColor = 'black';
		pokeballColors.strokeWidth = 1;
		pokeballColors.fillColor = 'red';
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
						stroke={pokeballColors.strokeColor}
						strokeOpacity={pokeballColors.opacity}
						strokeWidth={pokeballColors.strokeWidth}
					/>
				</Suspense>
			</View>
		</View>
	);
};

export default PokemonImage;
