import { typeColors } from '@constants/colors';

import type { PokemonId } from '@/src/types';
import { CustomEvolutionChain } from '@/src/types/evolutionChain';
import type { PokemonType } from '@/src/types/pokemonTypes';

export type EvolutionTab = 'about' | 'stats' | 'evolution';

export interface EvolutionChartTabConfig {
	id: EvolutionTab;
	label: string;
}

export interface EvolutionChartController {
	activeTab: EvolutionTab;
	displayName: string;
	formattedId: string;
	heroImageUrl?: string | null;
	isEvolutionLoading: boolean;
	isPokemonLoading: boolean;
	isSaved: boolean;
	primaryType: keyof typeof typeColors;
	savedPokemons: PokemonId[];
	tabConfig: EvolutionChartTabConfig[];
	typeChips: PokemonType[];
	evolutionData?: CustomEvolutionChain;
	evolutionError: unknown;
	hasPokemonId: boolean;
	onTabPress: (tab: EvolutionTab) => void;
}
