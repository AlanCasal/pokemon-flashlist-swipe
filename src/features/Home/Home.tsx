import { View, Dimensions } from 'react-native';
import React, { useMemo } from 'react';
import styles from './styles';
import { SPRITE_URL, TOTAL_POKEMON_COUNT } from '@/src/constants/api';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.55;
const SPACING = 8;

const Home = () => {
	const sprites = useMemo(() => {
		return Array.from({ length: 33 }).map(() => {
			const randomPokemon = Math.floor(Math.random() * TOTAL_POKEMON_COUNT) + 1;

			return SPRITE_URL(randomPokemon);
		});
	}, []);

	return (
		<View style={styles.container}>
			<Image
				source={sprites[0]}
				style={{ width: ITEM_SIZE, aspectRatio: 1, borderRadius: SPACING }}
			/>
		</View>
	);
};

export default Home;
