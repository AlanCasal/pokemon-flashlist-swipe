import Dots from '@assets/images/dots-big.svg';
import { typeBgColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import usePokemonDetails from '@hooks/usePokemonDetails';
import { useIsPokemonSaved, useToggleSavedPokemon } from '@store/savedStore';
import { useShowToast } from '@store/toastStore';
import texts from '@utils/texts.json';
import { Link } from 'expo-router';
import { MotiView } from 'moti';
import { memo, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import PokemonImage from './Image';
import Info from './Info';
import { useStyles } from './styles';
import type { PokemonCardProps } from './types';

const CARD_FADE_DURATION_MS = 300;

const PokeCardComponent = ({ url, isSavedMode = false }: PokemonCardProps) => {
	const [isExiting, setIsExiting] = useState(false);
	const toggleSavedPokemon = useToggleSavedPokemon();
	const showToast = useShowToast();
	const { data: pokemon, isLoading } = usePokemonDetails(url);

	const isSaved = useIsPokemonSaved(pokemon?.name);
	const type = (pokemon?.types[0]?.type.name ?? 'dark') as keyof typeof typeBgColors;
	const styles = useStyles({ type });

	const handleOnPressPokeball = useCallback(() => {
		if (!pokemon) return;

		const shouldRemove = isSaved;
		const toastData = {
			text: (
				<Text>
					<Text style={{ fontWeight: 'bold' }}>{pokemon.name}</Text>
					{shouldRemove ? texts.pokemonCard.toastRemovedSuffix : texts.pokemonCard.toastSavedSuffix}
				</Text>
			),
			backgroundColor: shouldRemove ? typeBgColors.dark : typeBgColors[type],
			isPokeballColored: !shouldRemove,
		};

		if (shouldRemove && isSavedMode) {
			setIsExiting(true);
			showToast(toastData);
			setTimeout(() => {
				toggleSavedPokemon(pokemon.name);
			}, CARD_FADE_DURATION_MS);
		} else {
			toggleSavedPokemon(pokemon.name);
			showToast(toastData);
		}
	}, [isSaved, isSavedMode, pokemon, showToast, toggleSavedPokemon, type]);

	if (isLoading || !pokemon) {
		return <View style={styles.loadingPlaceholder} />;
	}

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
			<TouchableOpacity activeOpacity={sharedStyles.opacity.active}>
				<MotiView
					from={{ opacity: 0 }}
					animate={{ opacity: isExiting ? 0 : 1 }}
					exit={{ opacity: 0 }}
					transition={{ type: 'timing', duration: CARD_FADE_DURATION_MS }}
					style={styles.cardContainer}
				>
					<PokemonImage
						uri={pokemon.sprites.other['official-artwork'].front_default}
						isSaved={isSaved}
					/>

					<View style={styles.pokeballDecoration}>
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

const PokeCard = memo(PokeCardComponent);

export default PokeCard;
