import { API_URL } from '@constants/api';
import { useQuery } from '@tanstack/react-query';
import { fetchJson } from '@utils/helpers';

import { PokemonDetails } from '@/src/types/pokemon';

const SEARCH_POKEMON_QUERY_KEY = 'pokemonSearch';

export const normalizeSearchTerm = (searchTerm: string) => searchTerm.trim().toLowerCase();

const fetchSearchPokemon = (searchTerm: string) =>
	fetchJson<PokemonDetails>(`${API_URL}/${encodeURIComponent(searchTerm)}`);

export const useSearchPokemon = (searchTerm: string, enabled: boolean) => {
	const normalizedTerm = normalizeSearchTerm(searchTerm);

	return useQuery<PokemonDetails, Error>({
		queryKey: [SEARCH_POKEMON_QUERY_KEY, normalizedTerm],
		queryFn: () => fetchSearchPokemon(normalizedTerm),
		enabled: enabled && normalizedTerm.length > 0,
		retry: false,
	});
};
