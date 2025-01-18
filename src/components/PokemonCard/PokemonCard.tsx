import { View, Text } from 'react-native';
import React, { lazy, memo, Suspense, useEffect, useState } from 'react';
import styles from './styles';
import { PokemonDetails } from '@/src/types/pokemon';
import axios from 'axios';
import { Image } from 'expo-image';
import { backgroundColors, colors } from '@/src/constants/colors';
import { POKEMON_CARD_HEIGHT } from '@/src/constants/sharedStyles';
import PokemonTypeIcon from '../PokemonTypeIcon';
import { PokemonType } from '@/src/types/pokemonTypes';

const Pokeball = lazy(() => import('@/assets/images/poke-ball.svg'));
const POKEBALL_WIDTH = 290;

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
		<View
			style={[
				styles.container,
				{
					backgroundColor:
						backgroundColors[
							pokemon.types[0].type.name as keyof typeof backgroundColors
						],
					shadowColor:
						backgroundColors[pokemon.types[0].type.name as keyof typeof colors],
				},
			]}
		>
			<View>
				<Image
					source={{
						uri: pokemon.sprites.other['official-artwork'].front_default,
					}}
					style={styles.image}
				/>
				<View style={styles.pokeballContainer}>
					<Suspense fallback={null}>
						<Pokeball width={POKEBALL_WIDTH} height={POKEMON_CARD_HEIGHT} />
					</Suspense>
				</View>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
					{pokemon.name}
				</Text>
				<View style={styles.typesContainer}>
					{pokemon.types.map((type, index) => (
						<View
							style={[
								styles.typeContainer,
								{
									backgroundColor:
										colors[type.type.name as keyof typeof colors],
								},
							]}
							key={index}
						>
							<PokemonTypeIcon type={type.type.name as PokemonType} />
							<Text style={styles.typeText}>{type.type.name}</Text>
						</View>
					))}
				</View>
				<Text style={styles.pokemonId}>
					#{pokemon.id.toString().padStart(3, '0')}
				</Text>
			</View>
		</View>
	);
};

export default memo(PokemonCard, (prevProps, nextProps) => {
	return prevProps.url === nextProps.url;
});
