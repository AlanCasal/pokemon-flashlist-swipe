import { API_URL } from '@constants/api';
import { useQuery } from '@tanstack/react-query';

import type { Pokemon, PokemonListResponse } from '@/src/types/pokemonList';
import { fetchJson } from '@/src/utils/helpers';

const POKEMON_CATALOG_STALE_TIME_MS = 300000; // 5 minutes
const POKEMON_CATALOG_GC_TIME_MS = 1800000; // 30 minutes

const fetchPokemonCatalog = async (): Promise<Pokemon[]> => {
	const firstPage = await fetchJson<PokemonListResponse>(`${API_URL}?offset=0&limit=1`);
	const totalCount = firstPage.count;

	if (totalCount <= firstPage.results.length) {
		return firstPage.results;
	}

	const allPokemonPage = await fetchJson<PokemonListResponse>(
		`${API_URL}?offset=0&limit=${totalCount}`,
	);

	return allPokemonPage.results;
};

export const usePokemonCatalog = (enabled = true) => {
	return useQuery<Pokemon[], Error>({
		queryKey: ['pokemonCatalog'],
		queryFn: fetchPokemonCatalog,
		enabled,
		staleTime: POKEMON_CATALOG_STALE_TIME_MS,
		gcTime: POKEMON_CATALOG_GC_TIME_MS,
	});
};
