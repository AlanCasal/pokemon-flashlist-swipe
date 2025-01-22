import { TouchableOpacity, View } from 'react-native';
import React, { lazy, memo, Suspense, useEffect, useState } from 'react';
import styles from './styles';
import PokemonImage from './Image';
import { PokemonDetails } from '@/src/types/pokemon';
import axios from 'axios';
import { typeBgColors } from '@/src/constants/colors';
import Info from './Info';
import { Link } from 'expo-router';
import { ACTIVE_OPACITY } from '@/src/constants/sharedStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Dots = lazy(() => import('@/assets/images/dots-big.svg'));

interface PokemonCardProps {
	url: string;
}

const PokeCard = ({ url }: PokemonCardProps) => {
	const [pokemon, setPokemon] = useState<PokemonDetails>();

	useEffect(() => {
		const getPokemon = async () => {
			const response = await axios.get(url);
			setPokemon(response.data);
		};

		getPokemon();
	}, [url]);

	if (!pokemon) return null;

	const type = pokemon.types[0].type.name as keyof typeof typeBgColors;
	const containerStyles = [
		styles.container,
		{
			backgroundColor: typeBgColors[type],
			shadowColor: typeBgColors[type],
		},
	];

	return (
		<Link
			href={{
				pathname: '/details',
				params: {
					id: pokemon.id,
					type: pokemon.types[0].type.name,
				},
			}}
			asChild
		>
			<TouchableOpacity activeOpacity={ACTIVE_OPACITY}>
				<View style={containerStyles}>
					<PokemonImage
						uri={pokemon.sprites.other['official-artwork'].front_default}
					/>

					<View style={styles.dotsContainer}>
						<Suspense fallback={null}>
							<Dots fill="white" width={90} />
						</Suspense>
					</View>

					<TouchableOpacity style={styles.starIconWrapper}>
						<MaterialCommunityIcons
							name="star-outline"
							size={20}
							color={'white'}
						/>
					</TouchableOpacity>

					<Info name={pokemon.name} types={pokemon.types} id={pokemon.id} />
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default memo(PokeCard, (prevProps, nextProps) => {
	return prevProps.url === nextProps.url;
});
