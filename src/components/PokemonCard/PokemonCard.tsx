import { View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import styles from './styles';
import PokemonImage from './Image';
import { PokemonDetails } from '@/src/types/pokemon';
import axios from 'axios';

import { backgroundColors, colors } from '@/src/constants/colors';
import Info from './Info';

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

	const containerStyles = [
		styles.container,
		{
			backgroundColor:
				backgroundColors[
					pokemon.types[0].type.name as keyof typeof backgroundColors
				],
			shadowColor:
				backgroundColors[pokemon.types[0].type.name as keyof typeof colors],
		},
	];

	return (
		<View style={containerStyles}>
			<PokemonImage
				uri={pokemon.sprites.other['official-artwork'].front_default}
			/>

			<Info name={pokemon.name} types={pokemon.types} id={pokemon.id} />
		</View>
	);
};

export default memo(PokemonCard, (prevProps, nextProps) => {
	return prevProps.url === nextProps.url;
});
