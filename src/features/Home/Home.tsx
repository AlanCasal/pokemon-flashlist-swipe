import { SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { API_URL } from '@/src/constants/api';
import { Pokemon } from '@/src/types/pokemonList';
import PokemonCard from '@/src/components/PokemonCard';
import axios from 'axios';

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
			console.error('Error fetching Pokemon:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRefresh = async () => {
		setPokemonList([]);
		setNext(API_URL);
		fetchPage(API_URL);
	};

	useEffect(() => {
		fetchPage(API_URL);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={pokemonList}
				renderItem={({ item }) => <PokemonCard url={item.url} />}
				onEndReached={() => fetchPage(next)}
				contentContainerStyle={styles.contentContainer}
				ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
				onEndReachedThreshold={0.7}
				keyExtractor={({ name }, index) => name + index.toString()}
				refreshing={isLoading}
				onRefresh={handleRefresh}
        // debug
			/>
		</SafeAreaView>
	);
};

export default Home;
