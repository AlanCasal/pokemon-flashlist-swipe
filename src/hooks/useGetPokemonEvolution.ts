/* eslint-disable @typescript-eslint/no-shadow */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { CustomEvolutionChain, EvolutionChain } from '../types/evolutionChain';
import { PokemonDetails } from '../types/pokemon';
import { PokemonSpecies } from '../types/pokemonSpecies';
import { processEvolutionChain } from '../utils/evolutionChainProcessor';

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

	const evolutionDetailsQuery = useQuery<CustomEvolutionChain>({
		queryKey: ['evolution-details', evolutionChainQuery.data],
		enabled: !!evolutionChainQuery.data,
		queryFn: async () => {
			const evolutionStages = processEvolutionChain(evolutionChainQuery.data!.chain);

			const addImages = async (chain: CustomEvolutionChain): Promise<CustomEvolutionChain> => {
				const response = await axios.get<PokemonDetails>(`${POKEMON_URL}/${chain.pokemon}`);

				return {
					...chain,
					imgUrl: response.data.sprites.other['official-artwork'].front_default,
					evolvesTo: await Promise.all(chain.evolvesTo.map(evolution => addImages(evolution))),
				};
			};

			return addImages(evolutionStages);
		},
	});

	return {
		data: evolutionDetailsQuery.data,
		isLoading:
			speciesQuery.isLoading || evolutionChainQuery.isLoading || evolutionDetailsQuery.isLoading,
		error: speciesQuery.error || evolutionChainQuery.error || evolutionDetailsQuery.error,
	};
};
