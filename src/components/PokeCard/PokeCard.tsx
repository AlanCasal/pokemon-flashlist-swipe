import { TouchableOpacity, View } from 'react-native';
import React, {
	lazy,
	memo,
	Suspense,
	useEffect,
	useMemo,
	useState,
} from 'react';
import styles from './styles';
import PokemonImage from './Image';
import { PokemonDetails } from '@/src/types/pokemon';
import axios from 'axios';
import { typeBgColors } from '@/src/constants/colors';
import Info from './Info';
import { Link } from 'expo-router';
import { ACTIVE_OPACITY } from '@/src/constants/sharedStyles';
import useSavedContext from '@/src/store/SavedContext/SavedContextContext';
// eslint-disable-next-line import/no-extraneous-dependencies

const Dots = lazy(() => import('@/assets/images/dots-big.svg'));
const Pokeball = lazy(() => import('@/assets/images/pokeball-full.svg'));
const POKEBALL_SIZE = 17;

interface PokemonCardProps {
	url: string;
}

const PokeCard = ({ url }: PokemonCardProps) => {
	const [pokemon, setPokemon] = useState<PokemonDetails>();
	const { savedPokemons, handleToggleSavedPokemon } = useSavedContext();

	useEffect(() => {
		const getPokemon = async () => {
			const response = await axios.get(url);
			setPokemon(response.data);
		};

		getPokemon();
	}, [url]);

	const isSaved = useMemo(
		() => savedPokemons.includes(pokemon?.name ?? ''),
		[savedPokemons, pokemon?.name]
	);

	if (!pokemon) return null;

	const type = pokemon.types[0].type.name as keyof typeof typeBgColors;
	const containerStyles = [
		styles.container,
		{
			backgroundColor: typeBgColors[type],
			shadowColor: typeBgColors[type],
		},
	];

	const handleOnPress = () => handleToggleSavedPokemon(pokemon.name);

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

					<TouchableOpacity
						style={styles.starIconWrapper}
						onPress={handleOnPress}
					>
						<Suspense fallback={null}>
							<Pokeball
								fill={isSaved ? 'red' : 'white'}
								stroke={isSaved ? 'black' : 'white'}
								strokeWidth={isSaved ? 2 : 0}
								width={POKEBALL_SIZE}
								height={POKEBALL_SIZE}
							/>
						</Suspense>
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
