import { View, Text } from 'react-native';
import React, { lazy, useState, Suspense } from 'react';
import styles from './styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Tabs, { TabItem } from '@/src/components/Tabs';
import { backgroundColors, colors, textColor } from '@/src/constants/colors';
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

const Pokeball = lazy(() => import('@/assets/images/poke-ball-full.svg'));

enum TabName {
	Evolution = 0,
}

const DELAY = 1000;

const Details = () => {
	const router = useRouter();
	const { id, type } = useLocalSearchParams();
	const { data: evolutionData } = useGetPokemonEvolutions(id as string);

	const [selectedIndex, setSelectedIndex] = useState(TabName.Evolution);

	const TABS_DATA: TabItem[] = [
		{ icon: 'ArrowUpWideNarrow', label: 'Evolution' },
		{
			icon: 'X',
			itemActiveBackgroundColor: colors.fighting,
			itemInactiveBackgroundColor: colors.fighting,
			itemInactiveColor: textColor.primary,
			isRounded: true,
			action: () => router.back(),
		},
	];

	const enteringAnimation = (delay = 300) => FadeIn.duration(500).delay(delay);

	return (
		<LinearGradient
			colors={[
				backgroundColors[type as keyof typeof backgroundColors],
				colors[type as keyof typeof colors],
			]}
			start={{ x: 0, y: 0 }} // top left
			end={{ x: 1, y: 1 }} // bottom right
			style={styles.container}
		>
			<Animated.View entering={enteringAnimation()} style={styles.titleWrapper}>
				<Text style={styles.title}>Evolution Chart</Text>
			</Animated.View>

			<Animated.View entering={enteringAnimation(600)}>
				{evolutionData?.map((evolution, index) => (
					<View key={index}>
						{index > 0 && (
							<Animated.View
								entering={
									index % 2
										? FadeInLeft.duration(500).delay(index * DELAY + DELAY / 2)
										: FadeInRight.duration(500).delay(index * DELAY + DELAY / 2)
								}
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
										{ backgroundColor: colors[type as keyof typeof colors] },
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
									style={{ position: 'absolute', zIndex: 1 }}
								/>
							</Suspense>
							<Image
								src={evolution.imgUrl}
								style={[styles.pokemonImage, { zIndex: 2 }]}
							/>
						</Animated.View>

						<Animated.Text
							entering={enteringAnimation((index + 1) * DELAY)}
							style={styles.pokemonName}
						>
							{evolution.pokemon}
						</Animated.Text>
					</View>
				))}
			</Animated.View>

			<Tabs
				data={TABS_DATA}
				selectedIndex={selectedIndex}
				onChange={setSelectedIndex}
				activeBackgroundColor={colors.dragon}
				inactiveBackgroundColor={colors.dark}
			/>
		</LinearGradient>
	);
};

export default Details;
