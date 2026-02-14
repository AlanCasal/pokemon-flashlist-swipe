import { API_URL } from '@constants/api';
import { useQuery } from '@tanstack/react-query';

import { PokemonDetails } from '../types/pokemon';
import { fetchJson } from '../utils/helpers';

const GET_POKEMON_DETAIL_KEY = 'GET_POKEMON_DETAIL_KEY';

export const useGetPokemonDetail = (id: string) => {
	const { data, isLoading, error } = useQuery<PokemonDetails, Error>({
		queryKey: [GET_POKEMON_DETAIL_KEY, id],
		queryFn: () => fetchJson<PokemonDetails>(`${API_URL}/${id}`),
	});

	return { data, isLoading, error };
};
