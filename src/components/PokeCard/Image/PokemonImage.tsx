import { View } from 'react-native';
import React, { lazy, Suspense } from 'react';
import { Image } from 'expo-image';
import { POKEMON_CARD_HEIGHT } from '@/src/constants/sharedStyles';
import styles from './styles';

const Pokeball = lazy(() => import('@/assets/images/poke-ball.svg'));
const POKEBALL_WIDTH = 290;

interface PokemonImageProps {
	uri: string;
}

const PokemonImage = ({ uri }: PokemonImageProps) => {
	return (
		<View>
			<Image source={{ uri }} style={styles.image} />
			<View style={styles.pokeballContainer}>
				<Suspense fallback={null}>
					<Pokeball width={POKEBALL_WIDTH} height={POKEMON_CARD_HEIGHT} />
				</Suspense>
			</View>
		</View>
	);
};

export default PokemonImage;
