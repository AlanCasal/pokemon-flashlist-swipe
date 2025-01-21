/* eslint-disable @typescript-eslint/naming-convention */
import { Chain, CustomEvolutionChain } from '../types/evolutionChain';

export const processEvolutionChain = (chain: Chain): CustomEvolutionChain => {
	const { evolution_details, evolves_to, species } = chain;

	return {
		pokemon: species.name,
		minLevel: evolution_details[0]?.min_level || null,
		useItem: evolution_details[0]?.item?.name || null,
		evolvesTo: evolves_to.map(evolution => processEvolutionChain(evolution)),
	};
};
