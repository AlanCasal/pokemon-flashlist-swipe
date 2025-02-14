import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PokemonDetails } from '@/src/types/pokemon';

const FETCH_POKEMON_DETAILS_QUERY_KEY = 'pokemonDetails';

const fetchPokemonDetails = async (url: string) => {
	const response = await axios.get<PokemonDetails>(url);
	return response.data;
};

const usePokemonDetails = (url: string) => {
	return useQuery<PokemonDetails, Error>({
		queryKey: [FETCH_POKEMON_DETAILS_QUERY_KEY, url],
		queryFn: () => fetchPokemonDetails(url),
	});
};

export default usePokemonDetails;
