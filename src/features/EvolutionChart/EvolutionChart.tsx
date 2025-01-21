import { View, Text, TouchableOpacity } from 'react-native';
import React, { lazy, Suspense } from 'react';
import styles from './styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { typeBgColors, textColor, typeColors } from '@/src/constants/colors';
import { useGetPokemonEvolutions } from '@/src/hooks/useGetPokemonEvolution';
import { Image } from 'moti';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
	FadeIn,
	FadeInLeft,
	FadeInRight,
} from 'react-native-reanimated';
import CustomTab from '@/src/components/Tabs/CustomTab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Pokeball = lazy(() => import('@/assets/images/poke-ball-full.svg'));

const DELAY = 1000;

const EvolutionChart = () => {
	const router = useRouter();
	const { bottom } = useSafeAreaInsets();

	const { id, type } = useLocalSearchParams();
	const { data: evolutionData } = useGetPokemonEvolutions(id as string);

	const enteringAnimation = (delay = 300) => FadeIn.duration(500).delay(delay);

	return (
		<>
			<View style={styles.starIconContainer}>
				<TouchableOpacity>
					<MaterialCommunityIcons
						name="star-outline"
						size={30}
						color={'white'}
					/>
				</TouchableOpacity>
			</View>

			<LinearGradient
				colors={[
					typeBgColors[type as keyof typeof typeBgColors],
					typeColors[type as keyof typeof typeColors],
				]}
				start={{ x: 0, y: 0 }} // top left
				end={{ x: 1, y: 1 }} // bottom right
				style={styles.container}
			>
				<Animated.View
					entering={enteringAnimation()}
					style={styles.titleWrapper}
				>
					<Text style={styles.title}>Evolution Chart</Text>
				</Animated.View>

				<Animated.View entering={enteringAnimation(600)}>
					{evolutionData?.map((evolution, index) => {
						const evolveAnim =
							index % 2
								? FadeInLeft.duration(500).delay(index * DELAY + DELAY / 2)
								: FadeInRight.duration(500).delay(index * DELAY + DELAY / 2);

						return (
							<View key={index}>
								{index > 0 && (
									<Animated.View
										entering={evolveAnim}
										style={styles.levelContainer}
									>
										<Text style={styles.evolvesAtText}>Evolves at</Text>

										<MaterialCommunityIcons
											name="arrow-down-bold-circle-outline"
											size={24}
											color={textColor.black}
										/>

										<Text
											style={[
												styles.levelText,
												{
													backgroundColor:
														typeColors[type as keyof typeof typeColors],
												},
											]}
										>
											(Level {evolution.minLevel})
										</Text>
									</Animated.View>
								)}

								<Animated.View
									entering={enteringAnimation((index + 1) * DELAY)}
									style={styles.pokemonContainer}
								>
									<Suspense fallback={null}>
										<Pokeball
											width={100}
											height={100}
											style={{ position: 'absolute' }}
										/>
									</Suspense>
									<Image
										src={evolution.imgUrl}
										style={[styles.pokemonImage, { zIndex: 1 }]}
									/>
								</Animated.View>

								<Animated.Text
									entering={enteringAnimation((index + 1) * DELAY)}
									style={styles.pokemonName}
								>
									{evolution.pokemon}
								</Animated.Text>
							</View>
						);
					})}
				</Animated.View>
			</LinearGradient>

			<View style={[styles.bottomTabContainer, { paddingBottom: bottom + 10 }]}>
				<CustomTab
					isRounded
					isFocused
					activeBackgroundColor={typeColors.fighting}
					tabBarIcon={({ color, size }) => (
						<MaterialCommunityIcons name="close" size={size} color={color} />
					)}
					onPress={() => router.back()}
				/>
			</View>
		</>
	);
};

export default EvolutionChart;
