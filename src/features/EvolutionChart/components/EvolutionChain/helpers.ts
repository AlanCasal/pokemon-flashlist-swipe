import type { CustomEvolutionChain } from '@/src/types/evolutionChain';

export const chunkEvolutions = (evolutions: CustomEvolutionChain[]) => {
	const chunks: CustomEvolutionChain[][] = [];

	for (let index = 0; index < evolutions.length; index += 3) {
		chunks.push(evolutions.slice(index, index + 3));
	}

	return chunks;
};

export const formatTriggerLabel = (trigger?: string | null) => {
	if (!trigger) return '';
	return `(${trigger.split('-').join(' ')})`;
};
