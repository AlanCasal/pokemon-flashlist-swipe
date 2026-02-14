import { API_URL } from '@constants/api';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchJson } from '@utils/helpers';

import { Pokemon } from '@/src/types/pokemonList';

interface PokemonListResponse {
	results: Pokemon[];
	next: string;
}

export const usePokemonList = () => {
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
	});
};
