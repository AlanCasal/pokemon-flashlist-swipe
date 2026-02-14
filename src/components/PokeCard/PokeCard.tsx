import { TouchableOpacity, View, Text } from 'react-native';
import { MotiView } from 'moti';
import PokemonImage from './Image';
import { typeBgColors } from '@constants/colors';
import Info from './Info';
import { Link } from 'expo-router';
import sharedStyles, {
	ACTIVE_OPACITY,
	CARDS_GAP,
	POKE_CARD_HEIGHT,
} from '@constants/sharedStyles';
import { useSavedPokemons, useToggleSavedPokemon } from '@store/savedStore';
import { useShowToast } from '@store/toastStore';
import usePokemonDetails from '@hooks/usePokemonDetails';
import Dots from '@assets/images/dots-big.svg';

interface PokemonCardProps {
	url: string;
}

const PokeCard = ({ url }: PokemonCardProps) => {
	const savedPokemons = useSavedPokemons();
	const toggleSavedPokemon = useToggleSavedPokemon();
	const showToast = useShowToast();
	const { data: pokemon, isLoading } = usePokemonDetails(url);

	const isSaved = savedPokemons.includes(pokemon?.name ?? '');

	if (isLoading || !pokemon) {
		return (
			<View style={{ height: POKE_CARD_HEIGHT, marginVertical: CARDS_GAP }} />
		);
	}

	const type = pokemon.types[0].type.name as keyof typeof typeBgColors;
	const containerStyles = {
		height: POKE_CARD_HEIGHT,
		backgroundColor: typeBgColors[type],
		paddingLeft: 5,
		paddingRight: 14,
		marginVertical: CARDS_GAP,
		shadowColor: typeBgColors[type],
		...sharedStyles.shadow,
	};

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
				<MotiView
					from={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ type: 'timing', duration: 300 }}
					className='flex-row items-center justify-between rounded-[10px]'
					style={containerStyles}
				>
					<PokemonImage
						uri={pokemon.sprites.other['official-artwork'].front_default}
						isSaved={isSaved}
					/>

					<View
						className='absolute bottom-3 items-center justify-center'
						style={{
							left: '35%',
							transform: [{ rotate: '-90deg' }],
						}}
					>
						<Dots
							fill='white'
							width={80}
						/>
					</View>

					<Info
						handleToggleSaved={handleOnPressPokeball}
						isSaved={isSaved}
						name={pokemon.name}
						types={pokemon.types}
						id={pokemon.id}
					/>
				</MotiView>
			</TouchableOpacity>
		</Link>
	);
};

export default PokeCard;
