import { ActivityIndicator, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles';
import { API_URL } from '@/src/constants/api';
import { Pokemon } from '@/src/types/pokemonList';
import PokemonCard from '@/src/components/PokemonCard';
import axios from 'axios';
import { POKEMON_CARD_HEIGHT } from '@/src/constants/sharedStyles';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = () => {
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

	return (
		<FlashList
			// data
			data={pokemonList}
			renderItem={handleRenderItem}
			ListFooterComponent={
				isLoading ? <ActivityIndicator size="large" /> : null
			}
			estimatedItemSize={POKEMON_CARD_HEIGHT}
			// content container style
			contentContainerStyle={{
				...styles.contentContainer,
				paddingTop: top,
				paddingBottom: bottom,
			}}
			// pull to refresh
			refreshing={isRefreshing}
			onRefresh={handleRefresh}
			// onEndReached load more items
			onEndReached={() => fetchPage(next)}
			// Optimizations
			keyExtractor={({ name }, index) => name + index.toString()}
		/>
	);
};

export default Home;
