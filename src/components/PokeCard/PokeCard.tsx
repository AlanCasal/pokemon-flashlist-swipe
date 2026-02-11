import { TouchableOpacity, View, Text } from 'react-native';
import React, { lazy, memo, Suspense, useMemo } from 'react';
import styles from './styles';
import PokemonImage from './Image';
import { typeBgColors } from '@constants/colors';
import Info from './Info';
import { Link } from 'expo-router';
import { ACTIVE_OPACITY } from '@constants/sharedStyles';
import { useSavedPokemons, useToggleSavedPokemon } from '@store/savedStore';
import { useShowToast } from '@store/toastStore';
import usePokemonDetails from '@hooks/usePokemonDetails';

const Dots = lazy(() => import('@assets/images/dots-big.svg'));

interface PokemonCardProps {
	url: string;
}

const PokeCard = ({ url }: PokemonCardProps) => {
	const savedPokemons = useSavedPokemons();
	const toggleSavedPokemon = useToggleSavedPokemon();
	const showToast = useShowToast();
	const { data: pokemon, isLoading } = usePokemonDetails(url);

	const isSaved = useMemo(
		() => savedPokemons.includes(pokemon?.name ?? ''),
		[savedPokemons, pokemon?.name]
	);

	if (isLoading || !pokemon) return null;

	const type = pokemon.types[0].type.name as keyof typeof typeBgColors;
	const containerStyles = [
		styles.container,
		{
			backgroundColor: typeBgColors[type],
			shadowColor: typeBgColors[type],
		},
	];

	const handleOnPressPokeball = () => {
		toggleSavedPokemon(pokemon.name);

		let text = (
			<Text>
				<Text style={{ fontWeight: 'bold' }}>{pokemon.name}</Text> saved !
			</Text>
		);
		let backgroundColor = typeBgColors[type];
		let isPokeballColored = true;

		if (isSaved) {
			backgroundColor = typeBgColors.dark;
			text = (
				<Text>
					<Text style={{ fontWeight: 'bold' }}>{pokemon.name}</Text> removed
				</Text>
			);
			isPokeballColored = false;
		}

		showToast({ text, backgroundColor, isPokeballColored });
	};

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
						isSaved={isSaved}
					/>

					<View style={styles.dotsContainer}>
						<Suspense fallback={null}>
							<Dots
								fill='white'
								width={80}
							/>
						</Suspense>
					</View>

					<Info
						handleToggleSaved={handleOnPressPokeball}
						isSaved={isSaved}
						name={pokemon.name}
						types={pokemon.types}
						id={pokemon.id}
					/>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default memo(PokeCard, (prevProps, nextProps) => {
	return prevProps.url === nextProps.url;
});
