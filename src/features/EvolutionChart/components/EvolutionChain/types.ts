import { typeColors } from '@constants/colors';

import { CustomEvolutionChain } from '@/src/types/evolutionChain';

export type EvolutionDirection = 'left' | 'right';

export interface EvolutionChainProps {
	evolution: CustomEvolutionChain;
	type: keyof typeof typeColors;
	depth?: number;
	direction?: EvolutionDirection;
}
