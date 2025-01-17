import { Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { API_URL } from '@/src/constants/api';
import { Pokemon } from '@/src/types/pokemonList';
import PokemonCard from '@/src/components/PokemonCard';

const Home = () => {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [next, setNext] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const getPokemonList = async () => {
			const response = await fetch(API_URL);
			const data = await response.json();
			setPokemonList(data.results);
			setNext(data.next);
		};

		getPokemonList();
	}, []);

	const handleLoadMore = async () => {
		if (isLoading || !next) return;

		setIsLoading(true);

		const response = await fetch(next);
		const data = await response.json();
		setPokemonList(prevPokemonList => [...prevPokemonList, ...data.results]);
		setNext(data.next);

		setIsLoading(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={pokemonList}
				renderItem={({ item }) => <PokemonCard url={item.url} />}
				keyExtractor={({ name }, index) => name + index.toString()}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.5}
				ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
			/>
		</SafeAreaView>
	);
};

export default Home;
