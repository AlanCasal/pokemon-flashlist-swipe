import { typeColors } from '@constants/colors';

import type { PokemonId } from '@/src/types';
import type { CustomEvolutionChain } from '@/src/types/evolutionChain';

export type EvolutionDirection = 'left' | 'right';

export interface EvolutionChainProps {
	savedPokemons: PokemonId[];
	evolution: CustomEvolutionChain;
	selectedPokemonName: string | null;
	type: keyof typeof typeColors;
	onPokemonPress: (pokemonName: string) => void;
	depth?: number;
	direction?: EvolutionDirection;
}

export interface EvolutionNodeProps {
	delay: number;
	fontSize?: number;
	imgUrl?: string;
	isNodeSaved: boolean;
	isSelected?: boolean;
	onPress?: () => void;
	pokemon: string;
	selectedTextColor?: string;
	size?: number;
	trigger?: string | null;
}
