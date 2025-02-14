import { View, Text, Pressable } from 'react-native';
import React, { useMemo } from 'react';
import styles, { SPACING } from './styles';
import { SPRITE_URL, TOTAL_POKEMON_COUNT } from '@/src/constants/api';
import { Image } from 'expo-image';
import { Marquee } from '@animatereactnative/marquee';
import { typeColors } from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Animated, {
	FadeInDown,
	FadeInLeft,
	FadeInRight,
} from 'react-native-reanimated';

const BG_COLOR = typeColors.dragon;
const MARQUEE_SPEED = 0.5;
const chunkArray = (array: string[], size: number) => {
	const chunkArr = [];
	let index = 0;

	while (index < array.length) {
		chunkArr.push(array.slice(index, index + size));
		index += size;
	}

	return chunkArr;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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

	const enteringAnimation = (columnIndex: number) => {
		const delay = 300 * (columnIndex + 1) + Math.random() * 100;

		return columnIndex % 2 === 0
			? FadeInRight.duration(500).delay(delay)
			: FadeInLeft.duration(500).delay(delay);
	};

	return (
		<View style={styles.container}>
			<StatusBar style='light' />

			<View style={styles.headerContainer}>
				<View style={styles.marqueesContainer}>
					{images.map((column, columnIndex) => (
						<Marquee
							key={`marquee-${columnIndex}`}
							spacing={SPACING}
							reverse={columnIndex % 2 !== 0}
							speed={MARQUEE_SPEED}
						>
							<View style={styles.spritesContainer}>
								{column.map((image, imageIndex) => (
									<Animated.Image
										key={`image-column-${columnIndex}-${imageIndex}`}
										source={{ uri: image }}
										entering={enteringAnimation(columnIndex)}
										style={styles.marqueeImage}
									/>
								))}
							</View>
						</Marquee>
					))}
				</View>

				<LinearGradient
					colors={[BG_COLOR, BG_COLOR, 'transparent']}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					locations={[0, 0.15, 1]}
					style={[styles.gradient, { top: 0 }]}
					pointerEvents='none'
				/>

				<LinearGradient
					colors={['#00000000', BG_COLOR, BG_COLOR]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					locations={[0, 0.7, 1]}
					style={[styles.gradient, { bottom: 0 }]}
					pointerEvents='none'
				/>
			</View>

			<View style={styles.bottomContainer}>
				<Image
					source={require('@/assets/images/pokedex-logo.png')}
					contentFit='contain'
					style={styles.logo}
				/>
				<Text style={styles.description}>
					Search for any Pokémon {'\n'} that exists on the planet !
				</Text>

				<AnimatedPressable
					onPress={() => {}}
					entering={FadeInDown.springify().damping(12).delay(300)}
					style={styles.button}
				>
					<View style={styles.buttonContent}>
						<Text style={styles.buttonText}>Start</Text>
					</View>
				</AnimatedPressable>
			</View>
		</View>
	);
};

export default Home;
