import { typeColors } from '@constants/colors';
import type { PokemonType } from '@constants/index';

import type { PokemonId } from '@/src/types';
import { CustomEvolutionChain } from '@/src/types/evolutionChain';

export type EvolutionTab = 'about' | 'stats' | 'evolution';

export interface EvolutionChartTabConfig {
	id: EvolutionTab;
	label: string;
}

export type PokemonAboutRowKind = 'text' | 'textWithSecondary' | 'genderSplit' | 'weaknessBadges';

export interface PokemonWeaknessBadge {
	label: string;
	multiplier: number;
	type: PokemonType;
}

export interface PokemonAboutRow {
	femaleValue?: string;
	kind: PokemonAboutRowKind;
	label: string;
	maleValue?: string;
	secondaryMode?: 'block' | 'inline';
	secondaryValue?: string;
	value?: string;
	weaknesses?: PokemonWeaknessBadge[];
}

export interface PokemonAboutSection {
	rows: PokemonAboutRow[];
	title: string;
}

export interface PokemonAboutData {
	description: string;
	sections: PokemonAboutSection[];
}

export interface EvolutionChartController {
	activeTab: EvolutionTab;
	aboutData?: PokemonAboutData;
	aboutError: unknown;
	displayName: string;
	formattedId: string;
	heroImageUrl?: string | null;
	isAboutLoading: boolean;
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
	selectedPokemonName: string | null;
	onEvolutionPokemonPress: (pokemonName: string) => void;
	onTabPress: (tab: EvolutionTab) => void;
}
