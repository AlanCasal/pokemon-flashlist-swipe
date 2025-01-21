import React, { lazy, Suspense } from 'react';
import styles from './styles';
import Animated from 'react-native-reanimated';
import { Image } from 'moti';
import { fadeInAnim } from '@/src/utils/animations';
import { View } from 'react-native';

const Pokeball = lazy(() => import('@/assets/images/poke-ball-full.svg'));

interface PokemonImageProps {
	imgUrl: string;
	pokemon: string;
	delay: number;
}

const PokemonImage = ({ imgUrl, pokemon, delay }: PokemonImageProps) => {
	return (
		<View>
			<Animated.View entering={fadeInAnim(delay)} style={styles.pokeContainer}>
				<Suspense fallback={null}>
					<Pokeball width={100} height={100} style={{ position: 'absolute' }} />
				</Suspense>
				<Image src={imgUrl} style={[styles.pokeImage, { zIndex: 1 }]} />
			</Animated.View>

			<Animated.Text entering={fadeInAnim(delay)} style={styles.pokeName}>
				{pokemon}
			</Animated.Text>
		</View>
	);
};

export default PokemonImage;
