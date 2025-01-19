import { View, Text } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetPokemonDetail } from '@/src/hooks/useGetPokemonDetail';
import Tabs, { TabItem } from '@/src/components/Tabs';
import { colors, textColor } from '@/src/constants/colors';

enum TabName {
	About = 0,
	Stats = 1,
	Evolution = 2,
}

const Details = () => {
	const { id } = useLocalSearchParams();
	const { data, isLoading, error } = useGetPokemonDetail(id as string);
	const router = useRouter();

	const [selectedIndex, setSelectedIndex] = useState(TabName.Evolution);

	const TABS_DATA: TabItem[] = [
		{ icon: 'BookOpenText', label: 'About' },
		{ icon: 'ChartBarBig', label: 'Stats' },
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

	return (
		<>
			<View style={styles.container}>
				<Text>Pokémon: {id}</Text>
			</View>

			<Tabs
				data={TABS_DATA}
				selectedIndex={selectedIndex}
				onChange={setSelectedIndex}
				activeBackgroundColor={colors.dragon}
				inactiveBackgroundColor={colors.dark}
			/>
		</>
	);
};

export default Details;
