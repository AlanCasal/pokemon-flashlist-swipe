import { useQueries } from '@tanstack/react-query';
import { API_URL, TOTAL_POKEMON_COUNT } from '@/src/constants/api';
import { useMemo } from 'react';

const usePokemonSprites = () => {
	const randomNumbers = useMemo(() => {
		return Array.from({ length: 20 }).map(() => {
			const randomPokemon = Math.floor(Math.random() * TOTAL_POKEMON_COUNT) + 1;

			return randomPokemon;
		});
	}, []);

	const pokemonQueries = useQueries({
		queries: randomNumbers.map(randomNumber => {
			return {
				queryKey: ['pokemon', randomNumber],
				queryFn: () =>
					fetch(`${API_URL}/${randomNumber}`).then(res => res.json()),
			};
		}),
	});

	const isLoading = pokemonQueries.every(query => query.isLoading);
	const hasError = pokemonQueries.some(query => query.isError);

	const sprites = pokemonQueries.reduce<string[]>((acc, query) => {
		if (query.data && !query.isError)
			acc.push(query.data.sprites.other['official-artwork'].front_default);

		return acc;
	}, []);

	return { sprites, isLoading, hasError };
};

export default usePokemonSprites;
