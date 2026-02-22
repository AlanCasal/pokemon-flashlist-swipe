import { typeColors } from '@constants/colors';

import type { PokemonId } from '@/src/types';
import type { CustomEvolutionChain } from '@/src/types/evolutionChain';

export type EvolutionDirection = 'left' | 'right';

export interface EvolutionChainProps {
	savedPokemons: PokemonId[];
	evolution: CustomEvolutionChain;
	type: keyof typeof typeColors;
	depth?: number;
	direction?: EvolutionDirection;
}

export interface EvolutionNodeProps {
	delay: number;
	fontSize?: number;
	imgUrl?: string;
	isNodeSaved: boolean;
	pokemon: string;
	size?: number;
	trigger?: string | null;
}
