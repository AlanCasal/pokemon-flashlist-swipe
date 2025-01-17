import { SafeAreaView, FlatList, ActivityIndicator, Alert } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles';
import { API_URL } from '@/src/constants/api';
import { Pokemon } from '@/src/types/pokemonList';
import PokemonCard from '@/src/components/PokemonCard';
import axios from 'axios';
import { CARDS_GAP, POKEMON_CARD_HEIGHT } from '@/src/constants/sharedStyles';

const CARD_OFFSET = POKEMON_CARD_HEIGHT + CARDS_GAP / 2;

const Home = () => {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [next, setNext] = useState<string>(API_URL); // https://pokeapi.co/api/v2/pokemon?offset=20&limit=20
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
		setPokemonList([]);
		setNext(API_URL);
		fetchPage(API_URL);
	};

	const handleRenderItem = useCallback(({ item }: { item: Pokemon }) => {
		return <PokemonCard url={item.url} />;
	}, []);

	const viewabilityConfigCallbackPairs = useMemo(
		() => [
			{
				viewabilityConfig: {
					// minimumViewTime: 500,
					itemVisiblePercentThreshold: 50,
				},
				onViewableItemsChanged: ({
					changed,
				}: {
					changed: Array<{ isViewable: boolean; item: Pokemon }>;
				}) => {
					changed.forEach(
						(changedItem: { isViewable: boolean; item: Pokemon }) => {
							changedItem.isViewable &&
								console.log(
									'\x1b[33m\x1b[44m\x1b[1m[changedItem]\x1b[0m',
									changedItem.item.url
								);
						}
					);
				},
			},
		],
		[]
	);

	useEffect(() => {
		fetchPage(API_URL);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!pokemonList.length) return <ActivityIndicator size="large" />;

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={pokemonList}
				renderItem={handleRenderItem}
				onEndReached={() => fetchPage(next)}
				ListFooterComponent={
					isLoading ? <ActivityIndicator size="large" /> : null
				}
				onEndReachedThreshold={0.7}
				keyExtractor={({ name }, index) => name + index.toString()}
				refreshing={isLoading}
				onRefresh={handleRefresh}
				initialNumToRender={5}
				debug
				contentContainerStyle={styles.contentContainer}
				getItemLayout={(_, index) => ({
					length: POKEMON_CARD_HEIGHT,
					offset: CARD_OFFSET * index,
					index,
				})}
				viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
				// windowSize={9}
			/>
		</SafeAreaView>
	);
};

export default Home;
