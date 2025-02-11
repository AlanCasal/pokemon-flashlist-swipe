import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '@/src/constants/api';
import { Pokemon } from '@/src/types/pokemonList';
import { useRef } from 'react';

interface PokemonListResponse {
	results: Pokemon[];
	next: string;
}

export const usePokemonList = () => {
	const hasFetched = useRef(false);

	return useInfiniteQuery<
		PokemonListResponse,
		Error,
		InfiniteData<PokemonListResponse>,
		string[],
		string
	>({
		queryKey: ['pokemonList'],
		queryFn: async ({ pageParam = API_URL }) => {
			if (hasFetched.current && pageParam === API_URL)
				return { results: [], next: '' };

			const response = await axios.get(pageParam);
			hasFetched.current = true;

			return response.data;
		},
		getNextPageParam: lastPage => lastPage.next,
		initialPageParam: API_URL,
	});
};
