import { typeColors } from '@constants/colors';

import type { PokemonAboutData } from '../../types';

export type PokemonAboutPrimaryType = keyof typeof typeColors;

export interface PokemonAboutProps {
	data?: PokemonAboutData;
	error: unknown;
	isLoading: boolean;
	primaryType: PokemonAboutPrimaryType;
}

export interface PokemonAboutRowProps {
	label: string;
	row: PokemonAboutData['sections'][number]['rows'][number];
}
