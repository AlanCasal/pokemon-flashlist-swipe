import { SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { API_URL } from '@/src/constants/api';
import { Pokemon } from '@/src/types/pokemonList';
import PokemonCard from '@/src/components/PokemonCard';

const Home = () => {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [next, setNext] = useState<string>(API_URL); // https://pokeapi.co/api/v2/pokemon?offset=20&limit=20
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchNextPage = async () => {
		if (isLoading) return;

		setIsLoading(true);

		const response = await fetch(next);
		const data = await response.json();
		setPokemonList(prevPokemonList => [...prevPokemonList, ...data.results]);
		setNext(data.next);

		setIsLoading(false);
	};

	useEffect(() => {
		fetchNextPage();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={pokemonList}
				renderItem={({ item }) => <PokemonCard url={item.url} />}
				keyExtractor={({ name }, index) => name + index.toString()}
				onEndReached={fetchNextPage}
				onEndReachedThreshold={0.5}
				ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
				contentContainerStyle={styles.contentContainer}
			/>
		</SafeAreaView>
	);
};

export default Home;
