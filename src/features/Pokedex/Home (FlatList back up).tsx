import { SafeAreaView, FlatList, ActivityIndicator, Alert } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles';
import { API_URL } from '@/src/constants/api';
import { Pokemon } from '@/src/types/pokemonList';
import PokemonCard from '@/src/components/PokeCard';
import axios from 'axios';
import { CARDS_GAP, POKE_CARD_HEIGHT } from '@/src/constants/sharedStyles';

const CARD_OFFSET = POKE_CARD_HEIGHT + CARDS_GAP / 2;

const Home = () => {
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

	const viewabilityConfigCallbackPairs = useRef([
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
	]);

	useEffect(() => {
		fetchPage(API_URL);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!pokemonList.length) return <ActivityIndicator size="large" />;

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				// data
				data={pokemonList}
				renderItem={handleRenderItem}
				ListFooterComponent={
					isLoading ? <ActivityIndicator size="large" /> : null
				}
				// content container style
				contentContainerStyle={styles.contentContainer}
				// pull to refresh
				refreshing={isRefreshing}
				onRefresh={handleRefresh}
				// onEndReached load more items
				onEndReached={() => fetchPage(next)}
				onEndReachedThreshold={1}
				// Optimizations
				keyExtractor={({ name }, index) => name + index.toString()}
				initialNumToRender={5}
				getItemLayout={(_, index) => ({
					length: POKE_CARD_HEIGHT, // pre calculation about items height, offset and index
					offset: CARD_OFFSET * index,
					index,
				})}
				viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
				//
				// onScroll, can animate to change opacity when items are leaving the screen
				// onScroll={({ nativeEvent }) => {
				// 	console.log(nativeEvent.contentOffset);
				// }}
				// example with a 2 columns list
				// numColumns={2} // also add flex: 1 to itemContainer style
				// columnWrapperStyle={{ gap: CARDS_GAP }} // horizontal gap, between the items in the same row
				//
				// windowSize={9}
				debug // debugger -> shows items rendered on the side
			/>
		</SafeAreaView>
	);
};

export default Home;
