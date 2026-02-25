import { typeColors } from '@constants/colors';

import type { EvolutionDirection } from '../../types';

export interface EvolveConditionProps {
	type: keyof typeof typeColors;
	minLevel: number | null;
	direction: EvolutionDirection;
	delay: number;
}
