import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { Fragment } from 'react';
import styles from './styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { typeBgColors, typeColors } from '@/src/constants/colors';
import { useGetPokemonEvolutions } from '@/src/hooks/useGetPokemonEvolution';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import CustomTab from '@/src/components/Tabs/CustomTab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonImage from './components/PokemonImage';
import { fadeInAnim } from '@/src/utils/animations';
import EvolveCondition from './components/EvolveCondition';

const POKEMON_DELAY = 500;

const EvolutionChart = () => {
	const router = useRouter();
	const { bottom } = useSafeAreaInsets();

	const { id, type } = useLocalSearchParams();
	const { data: evolutionData, isLoading } = useGetPokemonEvolutions(
		id as string
	);

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
					entering={fadeInAnim(POKEMON_DELAY)}
					style={styles.titleWrapper}
				>
					<Text style={styles.title}>Evolution Chart</Text>
				</Animated.View>

				{isLoading && (
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<ActivityIndicator size="large" color={'white'} />
					</View>
				)}

				{!isLoading && evolutionData && (
					<Animated.View entering={fadeInAnim(POKEMON_DELAY * 2)}>
						<View>
							<PokemonImage
								imgUrl={evolutionData.imgUrl!}
								pokemon={evolutionData.pokemon}
								delay={0}
							/>

							{evolutionData.evolvesTo.length > 0 &&
								evolutionData.evolvesTo.map((evolution, index) => (
									<Fragment key={index}>
										<EvolveCondition
											type={type as keyof typeof typeColors}
											minLevel={evolution.minLevel}
											direction="right"
											delay={POKEMON_DELAY * 3}
										/>

										<PokemonImage
											imgUrl={evolution.imgUrl!}
											pokemon={evolution.pokemon}
											delay={POKEMON_DELAY * 4}
										/>

										{evolution.evolvesTo.length > 0 &&
											evolution.evolvesTo.map((evolution2, index2) => (
												<Fragment key={index2}>
													<EvolveCondition
														type={type as keyof typeof typeColors}
														minLevel={evolution2.minLevel}
														direction="left"
														delay={POKEMON_DELAY * 5}
													/>

													<PokemonImage
														imgUrl={evolution2.imgUrl!}
														pokemon={evolution2.pokemon}
														delay={POKEMON_DELAY * 6}
													/>
												</Fragment>
											))}
									</Fragment>
								))}
						</View>
					</Animated.View>
				)}
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
