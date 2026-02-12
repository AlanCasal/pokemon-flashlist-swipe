import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '@constants/api';
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
		queryFn: async ({ pageParam = API_URL }) => {
			const response = await axios.get(pageParam);
			return response.data;
		},
		getNextPageParam: lastPage => lastPage.next || undefined,
		initialPageParam: API_URL,
	});
};
