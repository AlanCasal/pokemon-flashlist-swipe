import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { PokemonDetails } from '@/src/types/pokemon';
import axios from 'axios';

interface PokemonCardProps {
	url: string;
}

const PokemonCard = ({ url }: PokemonCardProps) => {
	const [pokemon, setPokemon] = useState<PokemonDetails>();

	useEffect(() => {
		const getPokemon = async () => {
			const response = await axios.get(url);
			setPokemon(response.data);
		};

		getPokemon();
	}, [url]);

	if (!pokemon) return null;

	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: pokemon.sprites.other['official-artwork'].front_default,
				}}
				style={styles.image}
			/>
			<Text>{pokemon.name}</Text>
		</View>
	);
};

export default PokemonCard;
