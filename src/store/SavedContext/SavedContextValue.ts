import { useState } from 'react';

type PokemonId = number;

const useSavedContextValue = () => {
	const [savedPokemons, setSavedPokemons] = useState<PokemonId[]>([]);

	const handleSavePokemon = () => {
		// ...
	};

	const handleRemovePokemon = () => {
		// ...
	};

	const handleClearSavedPokemons = () => {
		// ...
	};

	return {
		savedPokemons,
		handleSavePokemon,
		handleRemovePokemon,
		handleClearSavedPokemons,
	};
};

export default useSavedContextValue;
