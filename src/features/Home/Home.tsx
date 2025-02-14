import { View, Dimensions } from 'react-native';
import React, { useMemo } from 'react';
import styles from './styles';
import { SPRITE_URL, TOTAL_POKEMON_COUNT } from '@/src/constants/api';
import { Image } from 'expo-image';
import { Marquee } from '@animatereactnative/marquee';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.55;
const SPACING = 8;

const chunkArray = (array: string[], size: number) => {
	const chunkArr = [];
	let index = 0;

	while (index < array.length) {
		chunkArr.push(array.slice(index, index + size));
		index += size;
	}

	return chunkArr;
};

const Home = () => {
	const initialArray = useMemo(() => {
		return Array.from({ length: 33 }).map(() => {
			const randomPokemon = Math.floor(Math.random() * TOTAL_POKEMON_COUNT) + 1;

			return SPRITE_URL(randomPokemon);
		});
	}, []);

	const images = useMemo(
		() => chunkArray(initialArray, Math.floor(initialArray.length / 3)),
		[initialArray]
	);

	if (images.length === 0) return null;

	return (
		<View style={styles.container}>
			<Marquee spacing={SPACING}>
				<View style={[styles.spritesContainer, { gap: SPACING }]}>
					{images[0].slice(0, 3).map((image, index) => (
						<Image
							key={`image-row-0-${index}`}
							source={image}
							style={{
								width: ITEM_SIZE,
								aspectRatio: 1,
								backgroundColor: '#fafafa',
								borderRadius: SPACING,
							}}
						/>
					))}
				</View>
			</Marquee>
		</View>
	);
};

export default Home;
