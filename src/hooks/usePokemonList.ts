import { API_URL } from '@constants/api';
import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { chunkArray, fetchJson } from '@utils/helpers';

import {
	fetchPokemonDetails,
	getPokemonDetailsQueryKey,
	POKEMON_DETAILS_STALE_TIME_MS,
} from '@/src/hooks/usePokemonDetails';
import { PokemonListResponse } from '@/src/types/pokemonList';

// Fetch more items per page to reduce visible gaps while waiting for next page.
const POKEMON_LIST_PAGE_SIZE = 40; // items per page
const POKEMON_LIST_STALE_TIME_MS = 120000; // 2 minutes
const POKEMON_LIST_GC_TIME_MS = 900000; // 15 minutes
// Cap parallel detail prefetches so network stays responsive on mobile.
const DETAILS_PREFETCH_CONCURRENCY = 6; // concurrent requests
const INITIAL_POKEMON_LIST_URL = `${API_URL}?offset=0&limit=${POKEMON_LIST_PAGE_SIZE}`;

const prefetchPokemonDetailsFromPage = async (
	queryClient: ReturnType<typeof useQueryClient>,
	pokemonListPage: PokemonListResponse,
) => {
	const urls = pokemonListPage.results.map(pokemon => pokemon.url);
	const chunks = chunkArray(urls, DETAILS_PREFETCH_CONCURRENCY);

	// Warm detail cache for upcoming cards so rows can render immediately.
	for (const urlChunk of chunks) {
		await Promise.allSettled(
			urlChunk.map(url =>
				queryClient.prefetchQuery({
					queryKey: getPokemonDetailsQueryKey(url),
					queryFn: () => fetchPokemonDetails(url),
					staleTime: POKEMON_DETAILS_STALE_TIME_MS,
				}),
			),
		);
	}
};

export const usePokemonList = (enabled = true) => {
	const queryClient = useQueryClient();

	return useInfiniteQuery<
		PokemonListResponse,
		Error,
		InfiniteData<PokemonListResponse>,
		string[],
		string
	>({
		queryKey: ['pokemonList'],
		queryFn: async ({ pageParam = INITIAL_POKEMON_LIST_URL }) => {
			const pageData = await fetchJson<PokemonListResponse>(pageParam);
			// Prefetch in background; list page can render without waiting on this work.
			void prefetchPokemonDetailsFromPage(queryClient, pageData);

			return pageData;
		},
		getNextPageParam: lastPage => lastPage.next || undefined,
		initialPageParam: INITIAL_POKEMON_LIST_URL,
		enabled,
		staleTime: POKEMON_LIST_STALE_TIME_MS,
		gcTime: POKEMON_LIST_GC_TIME_MS,
	});
};
