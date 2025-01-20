import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { processEvolutionChain } from '../utils/evolutionChainProcessor';
import { PokemonSpecies } from '../types/pokemonSpecies';
import { EvolutionChain, EvolutionDetail } from '../types/evolutionChain';
import { PokemonDetails } from '../types/pokemon';

const SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species';
const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon';

export const useGetPokemonEvolutions = (id: string) => {
	const speciesQuery = useQuery<PokemonSpecies>({
		queryKey: ['pokemon-species', id],
		queryFn: async () => {
			const response = await axios.get<PokemonSpecies>(`${SPECIES_URL}/${id}`);

			return response.data;
		},
	});

	const evolutionChainQuery = useQuery<EvolutionChain>({
		queryKey: ['evolution-chain', speciesQuery.data?.evolution_chain.url],
		enabled: !!speciesQuery.data?.evolution_chain.url,
		queryFn: async () => {
			const response = await axios.get(speciesQuery.data!.evolution_chain.url);
			return response.data;
		},
	});

	const evolutionDetailsQuery = useQuery<EvolutionDetail[]>({
		queryKey: ['evolution-details', evolutionChainQuery.data],
		enabled: !!evolutionChainQuery.data,
		queryFn: async () => {
			const evolutionStages = processEvolutionChain(
				evolutionChainQuery.data!.chain
			);

			const detailsPromises = evolutionStages.map(
				async ({ pokemon, minLevel }) => {
					const response = await axios.get<PokemonDetails>(
						`${POKEMON_URL}/${pokemon}`
					);

					return {
						pokemon,
						minLevel,
						imgUrl:
							response.data.sprites.other['official-artwork'].front_default,
					};
				}
			);

			return Promise.all(detailsPromises);
		},
	});

	return {
		data: evolutionDetailsQuery.data,
		isLoading:
			speciesQuery.isLoading ||
			evolutionChainQuery.isLoading ||
			evolutionDetailsQuery.isLoading,
		error:
			speciesQuery.error ||
			evolutionChainQuery.error ||
			evolutionDetailsQuery.error,
	};
};
