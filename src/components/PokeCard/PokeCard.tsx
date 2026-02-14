import Dots from '@assets/images/dots-big.svg';
import { typeBgColors } from '@constants/colors';
import sharedStyles, { ACTIVE_OPACITY, CARDS_GAP, POKE_CARD_HEIGHT } from '@constants/sharedStyles';
import usePokemonDetails from '@hooks/usePokemonDetails';
import { useSavedPokemons, useToggleSavedPokemon } from '@store/savedStore';
import { useShowToast } from '@store/toastStore';
import { Link } from 'expo-router';
import { MotiView } from 'moti';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import PokemonImage from './Image';
import Info from './Info';

const FADE_DURATION = 300;

interface PokemonCardProps {
	url: string;
}

const PokeCard = ({ url }: PokemonCardProps) => {
	const [isExiting, setIsExiting] = useState(false);
	const savedPokemons = useSavedPokemons();
	const toggleSavedPokemon = useToggleSavedPokemon();
	const showToast = useShowToast();
	const { data: pokemon, isLoading } = usePokemonDetails(url);

	const isSaved = savedPokemons.includes(pokemon?.name ?? '');

	if (isLoading || !pokemon) {
		return <View style={{ height: POKE_CARD_HEIGHT, marginVertical: CARDS_GAP }} />;
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

			setIsExiting(true);
			showToast({ text, backgroundColor, isPokeballColored });
			setTimeout(() => {
				toggleSavedPokemon(pokemon.name);
			}, FADE_DURATION);
		} else {
			toggleSavedPokemon(pokemon.name);
			showToast({ text, backgroundColor, isPokeballColored });
		}
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
					animate={{ opacity: isExiting ? 0 : 1 }}
					exit={{ opacity: 0 }}
					transition={{ type: 'timing', duration: FADE_DURATION }}
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
