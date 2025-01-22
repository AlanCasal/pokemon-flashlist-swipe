import { ActivityIndicator, Alert, StyleProp, ViewStyle } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles';
import { API_URL } from '@/src/constants/api';
import { Pokemon } from '@/src/types/pokemonList';
import PokemonCard from '@/src/components/PokeCard';
import axios from 'axios';
import { POKE_CARD_HEIGHT } from '@/src/constants/sharedStyles';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { typeBgColors } from '@/src/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const Pokedex = () => {
	const { top, bottom } = useSafeAreaInsets();

	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [next, setNext] = useState<string>(API_URL); // https://pokeapi.co/api/v2/pokemon?offset=20&limit=20
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

	const fetchPage = async (url: string) => {
		if (isLoading) return;

		setIsLoading(true);

		try {
			const response = await axios.get(url);
			const data = response.data;
			setPokemonList(prevPokemonList => [...prevPokemonList, ...data.results]);
			setNext(data.next);
		} catch (error) {
			Alert.alert('Error fetching Pokemon:', (error as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRefresh = async () => {
		setIsRefreshing(true);

		setPokemonList([]);
		setNext(API_URL);
		fetchPage(API_URL);

		setIsRefreshing(false);
	};

	const handleRenderItem = useCallback(({ item }: { item: Pokemon }) => {
		return <PokemonCard url={item.url} />;
	}, []);

	useEffect(() => {
		fetchPage(API_URL);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!pokemonList.length) return <ActivityIndicator size="large" />;

	const contentContainerStyle: StyleProp<ViewStyle> = {
		...styles.contentContainer,
		paddingTop: top,
		paddingBottom: bottom,
	};

	return (
		<LinearGradient
			colors={['white', typeBgColors.normal]}
			start={{ x: 0, y: 0 }}
			end={{ x: 2.5, y: 1 }}
			style={styles.container}
		>
			<FlashList
				// data
				data={pokemonList}
				renderItem={handleRenderItem}
				estimatedItemSize={POKE_CARD_HEIGHT}
				// content container style
				onEndReachedThreshold={1}
				contentContainerStyle={contentContainerStyle}
				// pull to refresh
				refreshing={isRefreshing}
				onRefresh={handleRefresh}
				// onEndReached load more items
				onEndReached={() => fetchPage(next)}
				// Optimizations
				keyExtractor={({ name }, index) => name + index.toString()}
			/>
		</LinearGradient>
	);
};

export default Pokedex;
