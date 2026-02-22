import { typeColors } from '@constants/colors';

import type { PokemonId } from '@/src/types';
import { CustomEvolutionChain } from '@/src/types/evolutionChain';

export type EvolutionDirection = 'left' | 'right';

export interface EvolutionChainProps {
	savedPokemons: PokemonId[];
	evolution: CustomEvolutionChain;
	type: keyof typeof typeColors;
	depth?: number;
	direction?: EvolutionDirection;
}
