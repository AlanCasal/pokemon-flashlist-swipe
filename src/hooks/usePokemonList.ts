import { API_URL } from '@constants/api';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchJson } from '@utils/helpers';

import { PokemonListResponse } from '@/src/types/pokemonList';

export const usePokemonList = (enabled = true) => {
	return useInfiniteQuery<
		PokemonListResponse,
		Error,
		InfiniteData<PokemonListResponse>,
		string[],
		string
	>({
		queryKey: ['pokemonList'],
		queryFn: ({ pageParam = API_URL }) => fetchJson<PokemonListResponse>(pageParam),
		getNextPageParam: lastPage => lastPage.next || undefined,
		initialPageParam: API_URL,
		enabled,
	});
};
