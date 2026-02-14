import { useQuery } from '@tanstack/react-query';
import { fetchJson } from '@utils/helpers';

import { PokemonDetails } from '@/src/types/pokemon';

const FETCH_POKEMON_DETAILS_QUERY_KEY = 'pokemonDetails';

const fetchPokemonDetails = async (url: string) => {
	return fetchJson<PokemonDetails>(url);
};

const usePokemonDetails = (url: string) => {
	return useQuery<PokemonDetails, Error>({
		queryKey: [FETCH_POKEMON_DETAILS_QUERY_KEY, url],
		queryFn: () => fetchPokemonDetails(url),
	});
};

export default usePokemonDetails;
