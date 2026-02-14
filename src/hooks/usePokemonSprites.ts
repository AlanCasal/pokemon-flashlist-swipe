import { API_URL, TOTAL_POKEMON_COUNT } from '@constants/api';
import { useQueries } from '@tanstack/react-query';
import { fetchJson } from '@utils/helpers';
import { useState } from 'react';

const usePokemonSprites = () => {
	const [randomNumbers] = useState(() => {
		const uniqueNumbers = new Set<number>();

		while (uniqueNumbers.size < 9) {
			uniqueNumbers.add(Math.floor(Math.random() * TOTAL_POKEMON_COUNT) + 1);
		}

		return Array.from(uniqueNumbers);
	});

	const pokemonQueries = useQueries({
		queries: randomNumbers.map(randomNumber => {
			return {
				queryKey: ['pokemon', randomNumber],
				queryFn: async () => {
					const pokemonData = await fetchJson<any>(`${API_URL}/${randomNumber}`);

					return {
						image: pokemonData.sprites.other['official-artwork'].front_default,
						type: pokemonData.types[0].type.name,
					};
				},
			};
		}),
	});

	const isLoading = pokemonQueries.some(query => query.isLoading);
	const hasError = pokemonQueries.some(query => query.isError);

	const data = pokemonQueries.reduce<
		{
			image: string;
			type: string;
		}[]
	>((acc, query) => {
		if (query.data && !query.isError) {
			acc.push({
				image: query.data.image,
				type: query.data.type,
			});
		}

		return acc;
	}, []);

	return { data, isLoading, hasError };
};

export default usePokemonSprites;
