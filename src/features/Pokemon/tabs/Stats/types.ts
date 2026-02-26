import { typeColors } from '@constants/colors';

import type { PokemonStatsData } from '../../types';

export type PokemonStatsPrimaryType = keyof typeof typeColors;

export interface PokemonStatsProps {
	data?: PokemonStatsData;
	displayName: string;
	error: unknown;
	isLoading: boolean;
	primaryType: PokemonStatsPrimaryType;
}
