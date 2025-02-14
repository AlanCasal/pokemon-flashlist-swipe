import { View, Text, Pressable, ActivityIndicator, Alert } from 'react-native';
import React, { lazy, Suspense } from 'react';
import { pokeballColors, typeColors } from '../../constants/colors';
import Animated, {
	FadeInDown,
	FadeInLeft,
	FadeInRight,
} from 'react-native-reanimated';
import usePokemonSprites from '@/src/hooks/usePokemonSprites';
import { chunkArray } from '@/src/utils/helpers';
import { Marquee } from '@animatereactnative/marquee';
import { LinearGradient } from 'expo-linear-gradient';
import styles, { SPACING } from './styles';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

const BG_COLOR = typeColors.dragon;
const MARQUEE_SPEED = 0.5;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Pokeball = lazy(() => import('@/assets/images/pokeball-full.svg'));

const Home = () => {
	const { data, isLoading, hasError } = usePokemonSprites();

	if (isLoading || data.length === 0)
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' />
			</View>
		);

	if (hasError) {
		Alert.alert('Error', 'Failed to fetch some Pokemon data.');
		return (
			<View>
				<Text>An error occurred.</Text>
			</View>
		);
	}

	const formattedArray = chunkArray(data, Math.floor(data.length / 3));

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
					{formattedArray.map((column, columnIndex) => (
						<Marquee
							key={`marquee-${columnIndex}`}
							spacing={SPACING}
							reverse={columnIndex % 2 !== 0}
							speed={MARQUEE_SPEED}
						>
							<View style={styles.spritesContainer}>
								{column.map(({ image, type }, imageIndex) => (
									<View
										key={`image-column-${columnIndex}-${imageIndex}`}
										style={[
											styles.marqueeImageContainer,
											{
												backgroundColor:
													typeColors[type as keyof typeof typeColors],
											},
										]}
									>
										<Image
											source={{ uri: image }}
											style={[styles.marqueeImage]}
										/>
										<View style={styles.pokeballContainer}>
											<Suspense fallback={null}>
												<Pokeball
													width='100%'
													height='100%'
													fill={pokeballColors.white}
													fillOpacity={0.3}
												/>
											</Suspense>
										</View>
									</View>
								))}
							</View>
						</Marquee>
					))}
				</View>

				<LinearGradient
					colors={[BG_COLOR, BG_COLOR, '#00000000']}
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
