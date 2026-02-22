import type { PokedexHeightOption, PokedexWeightOption } from '@/src/types';
import type { PokemonType } from '@/src/types/pokemonTypes';

import type { PokedexFilterNumberRange, PokedexFilterState } from '../../types';

export interface FilterBottomSheetProps {
	draftState: PokedexFilterState;
	isOpen: boolean;
	numberRangeDefaults: PokedexFilterNumberRange;
	onApply: () => void;
	onClose: () => void;
	onHeightOptionPress: (option: PokedexHeightOption) => void;
	onNumberRangeChange: (range: PokedexFilterNumberRange) => void;
	onReset: () => void;
	onTypeOptionPress: (option: PokemonType) => void;
	onWeaknessOptionPress: (option: PokemonType) => void;
	onWeightOptionPress: (option: PokedexWeightOption) => void;
}
