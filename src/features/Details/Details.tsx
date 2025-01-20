import { View, Text } from 'react-native';
import React, { lazy, useState } from 'react';
import styles from './styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Tabs, { TabItem } from '@/src/components/Tabs';
import { backgroundColors, colors, textColor } from '@/src/constants/colors';
import { useGetPokemonEvolutions } from '@/src/hooks/useGetPokemonEvolution';
import { Image } from 'moti';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Pokeball = lazy(() => import('@/assets/images/poke-ball-full.svg'));
export const LEVEL_TEXT_WIDTH = 80;

enum TabName {
	Evolution = 0,
}

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

	const backgroundColor =
		backgroundColors[type as keyof typeof backgroundColors];

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<Text style={styles.sectionHeader}>Evolution Chart</Text>

			<View>
				{evolutionData?.map((evolution, index) => (
					<View key={index}>
						{index > 0 && (
							<View style={styles.levelContainer}>
								<Text style={styles.evolvesAtText}>evolves at</Text>

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
							</View>
						)}

						<View style={styles.pokemonContainer}>
							<Pokeball
								width={100}
								height={100}
								style={{ position: 'absolute', zIndex: 1 }}
							/>
							<Image
								src={evolution.imgUrl}
								style={[styles.pokemonImage, { zIndex: 2 }]}
							/>
						</View>

						<Text style={styles.pokemonName}>{evolution.pokemon}</Text>
					</View>
				))}
			</View>

			<Tabs
				data={TABS_DATA}
				selectedIndex={selectedIndex}
				onChange={setSelectedIndex}
				activeBackgroundColor={colors.dragon}
				inactiveBackgroundColor={colors.dark}
			/>
		</View>
	);
};

export default Details;
