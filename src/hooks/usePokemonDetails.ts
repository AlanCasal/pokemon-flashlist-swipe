import { useQuery } from '@tanstack/react-query';
import { fetchJson } from '@utils/helpers';

import { PokemonDetails } from '@/src/types/pokemon';

export const FETCH_POKEMON_DETAILS_QUERY_KEY = 'pokemonDetails';
// Keep details fresh for a while to avoid refetching when rows remount during scroll.
export const POKEMON_DETAILS_STALE_TIME_MS = 600000; // 10 minutes
// Retain details in cache so revisiting list items is instant.
export const POKEMON_DETAILS_GC_TIME_MS = 1800000; // 30 minutes

export const fetchPokemonDetails = async (url: string) => {
	return fetchJson<PokemonDetails>(url);
};

export const getPokemonDetailsQueryKey = (url: string) =>
	[FETCH_POKEMON_DETAILS_QUERY_KEY, url] as const;

const usePokemonDetails = (url: string) => {
	return useQuery<PokemonDetails, Error>({
		queryKey: getPokemonDetailsQueryKey(url),
		queryFn: () => fetchPokemonDetails(url),
		enabled: Boolean(url),
		staleTime: POKEMON_DETAILS_STALE_TIME_MS,
		gcTime: POKEMON_DETAILS_GC_TIME_MS,
	});
};

export default usePokemonDetails;
