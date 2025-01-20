import { EvolutionChain } from '../types/evolutionChain';

export const processEvolutionChain = (
	chain: EvolutionChain['chain']
): Array<{ pokemon: string; minLevel: number }> => {
	const results: Array<{ pokemon: string; minLevel: number }> = [];

	const processChain = (currentChain: typeof chain) => {
		results.push({
			pokemon: currentChain.species.name,
			minLevel:
				currentChain === chain
					? 1
					: (currentChain.evolution_details[0]?.min_level ?? 0),
		});

		if (currentChain.evolves_to.length > 0)
			processChain(currentChain.evolves_to[0]);
	};

	processChain(chain);

	return results;
};
