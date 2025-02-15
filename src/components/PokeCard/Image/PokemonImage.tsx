import { pokeballColors } from '@constants/colors';
import { POKE_CARD_HEIGHT, SVG_DEFAULT_OPACITY } from '@constants/sharedStyles';
import { Image } from 'expo-image';
import React, { lazy, Suspense } from 'react';
import { View } from 'react-native';
import styles from './styles';

const Pokeball = lazy(() => import('@assets/images/pokeball-full.svg'));
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
				style={styles.image}
			/>
			<View style={styles.pokeballContainer}>
				<Suspense fallback={null}>
					<Pokeball
						width={POKEBALL_SIZE}
						height={POKEBALL_SIZE}
						fill={colors.fillColor}
						fillOpacity={colors.opacity}
					/>
				</Suspense>
			</View>
		</View>
	);
};

export default PokemonImage;
