import type { PokedexFilterNumberRange } from '@/src/features/Pokedex/types';

export interface NumberRangeSliderProps {
	isRangeMaxedOut: boolean;
	max: number;
	min: number;
	range: PokedexFilterNumberRange;
}
