/* eslint-disable @typescript-eslint/no-shadow */
import { API_URL, POKEMON_SPECIES_URL } from '@constants/api';
import { useQuery } from '@tanstack/react-query';

import { CustomEvolutionChain, EvolutionChain } from '../types/evolutionChain';
import { PokemonDetails } from '../types/pokemon';
import { PokemonSpecies } from '../types/pokemonSpecies';
import { processEvolutionChain } from '../utils/evolutionChainProcessor';
import { fetchJson } from '../utils/helpers';

export const useGetPokemonEvolutions = (id: string) => {
	const normalizedId = id.trim();

	const speciesQuery = useQuery<PokemonSpecies>({
		queryKey: ['pokemon-species', normalizedId],
		enabled: Boolean(normalizedId),
		queryFn: () => fetchJson<PokemonSpecies>(`${POKEMON_SPECIES_URL}/${normalizedId}`),
	});

	const evolutionChainQuery = useQuery<EvolutionChain>({
		queryKey: ['evolution-chain', speciesQuery.data?.evolution_chain.url],
		enabled: !!speciesQuery.data?.evolution_chain.url,
		queryFn: () => fetchJson<EvolutionChain>(speciesQuery.data!.evolution_chain.url),
	});

	const evolutionDetailsQuery = useQuery<CustomEvolutionChain>({
		queryKey: ['evolution-details', evolutionChainQuery.data],
		enabled: !!evolutionChainQuery.data,
		queryFn: async () => {
			const evolutionStages = processEvolutionChain(evolutionChainQuery.data!.chain);

			const addImages = async (chain: CustomEvolutionChain): Promise<CustomEvolutionChain> => {
				const pokemonData = await fetchJson<PokemonDetails>(`${API_URL}/${chain.pokemon}`);

				return {
					...chain,
					imgUrl: pokemonData.sprites.other['official-artwork'].front_default,
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
