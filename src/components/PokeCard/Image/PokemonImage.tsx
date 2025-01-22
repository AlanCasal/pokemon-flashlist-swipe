import { View } from 'react-native';
import React, { lazy, Suspense } from 'react';
import { Image } from 'expo-image';
import {
	POKE_CARD_HEIGHT,
	SVG_DEFAULT_OPACITY,
} from '@/src/constants/sharedStyles';
import styles from './styles';

const Pokeball = lazy(() => import('@/assets/images/pokeball-full.svg'));

interface PokemonImageProps {
	uri: string;
	fillColor?: string;
	fillOpacity?: number;
	strokeColor?: string;
	strokeOpacity?: number;
}

const PokemonImage = ({
	uri,
	fillColor = 'white',
	strokeColor = 'transparent',
	fillOpacity = SVG_DEFAULT_OPACITY,
	strokeOpacity = SVG_DEFAULT_OPACITY,
}: PokemonImageProps) => {
	return (
		<View>
			<Image source={{ uri }} style={styles.image} />
			<View style={styles.pokeballContainer}>
				<Suspense fallback={null}>
					<Pokeball
						width={POKE_CARD_HEIGHT}
						height={POKE_CARD_HEIGHT}
						fill={fillColor}
						fillOpacity={fillOpacity}
						stroke={strokeColor}
						strokeOpacity={strokeOpacity}
					/>
				</Suspense>
			</View>
		</View>
	);
};

export default PokemonImage;
