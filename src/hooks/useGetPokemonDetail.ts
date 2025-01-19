import { useQuery } from '@tanstack/react-query';
import { PokemonDetails } from '../types/pokemon';
import axios from 'axios';

const GET_POKEMON_DETAIL_KEY = 'GET_POKEMON_DETAIL_KEY';
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const useGetPokemonDetail = (id: string) => {
	const { data, isLoading, error } = useQuery<PokemonDetails, Error>({
		queryKey: [GET_POKEMON_DETAIL_KEY, id],
		queryFn: async () => {
			const response = await axios.get(`${BASE_URL}/${id}/`);
			return response.data;
		},
	});

	return { data, isLoading, error };
};
