import { useState } from 'react';

type PokemonId = string;

const INITIAL_DATA: PokemonId[] = [];

const useSavedContextValue = () => {
	const [savedPokemons, setSavedPokemons] = useState<PokemonId[]>(INITIAL_DATA);

	const handleToggleSavedPokemon = (pokemonId: PokemonId) => {
		setSavedPokemons(prev =>
			prev.includes(pokemonId)
				? prev.filter(id => id !== pokemonId)
				: [...prev, pokemonId]
		);
	};

	const handleClearSavedPokemons = () => {
		setSavedPokemons(INITIAL_DATA);
	};

	return {
		savedPokemons,
		handleToggleSavedPokemon,
		handleClearSavedPokemons,
	};
};

export default useSavedContextValue;
