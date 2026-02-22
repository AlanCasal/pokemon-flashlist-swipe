import { POKEDEX_NUMBER_RANGE_DEFAULTS } from '@constants/pokedex';
import { useCallback, useMemo, useState } from 'react';

import { type PokedexHeightOption, type PokedexMode, type PokedexWeightOption } from '@/src/types';
import type { PokemonType } from '@/src/types/pokemonTypes';

import { getAppliedFilterCount, getNextMultiSelectOptions } from '../helpers';
import { type PokedexFiltersByMode, type PokedexFilterState } from '../types';

interface GetNextAppliedFiltersByModeParams {
	currentMode: PokedexMode;
	draftFilterState: PokedexFilterState;
	previousFiltersByMode: PokedexFiltersByMode;
}

interface UsePokedexFilterStateParams {
	currentMode: PokedexMode;
	onCloseFilterSheet: () => void;
	onOpenFilterSheet: () => void;
}

export const createDefaultFilterState = (): PokedexFilterState => ({
	numberRange: {
		min: POKEDEX_NUMBER_RANGE_DEFAULTS.min,
		max: POKEDEX_NUMBER_RANGE_DEFAULTS.max,
	},
	selectedTypes: [],
	selectedWeaknesses: [],
	selectedHeights: [],
	selectedWeights: [],
});

export const cloneFilterState = (filterState: PokedexFilterState): PokedexFilterState => ({
	numberRange: { ...filterState.numberRange },
	selectedTypes: [...filterState.selectedTypes],
	selectedWeaknesses: [...filterState.selectedWeaknesses],
	selectedHeights: [...filterState.selectedHeights],
	selectedWeights: [...filterState.selectedWeights],
});

export const getNextAppliedFiltersByMode = ({
	currentMode,
	draftFilterState,
	previousFiltersByMode,
}: GetNextAppliedFiltersByModeParams): PokedexFiltersByMode => ({
	...previousFiltersByMode,
	[currentMode]: cloneFilterState(draftFilterState),
});

const createDefaultFiltersByMode = (): PokedexFiltersByMode => ({
	all: createDefaultFilterState(),
	saved: createDefaultFilterState(),
});

export const usePokedexFilterState = ({
	currentMode,
	onCloseFilterSheet,
	onOpenFilterSheet,
}: UsePokedexFilterStateParams) => {
	const [draftFilterState, setDraftFilterState] = useState<PokedexFilterState>(() =>
		createDefaultFilterState(),
	);
	const [appliedFiltersByMode, setAppliedFiltersByMode] = useState<PokedexFiltersByMode>(() =>
		createDefaultFiltersByMode(),
	);

	const appliedFilterState = appliedFiltersByMode[currentMode];

	const activeFilterCount = useMemo(
		() =>
			getAppliedFilterCount({
				filterState: appliedFilterState,
				defaultRange: POKEDEX_NUMBER_RANGE_DEFAULTS,
			}),
		[appliedFilterState],
	);

	const hasActiveFilter = activeFilterCount > 0;

	const handleFilterPress = useCallback(() => {
		setDraftFilterState(cloneFilterState(appliedFilterState));
		onOpenFilterSheet();
	}, [appliedFilterState, onOpenFilterSheet]);

	const handleFilterTypeOptionPress = useCallback((option: PokemonType) => {
		setDraftFilterState(previousState => ({
			...previousState,
			selectedTypes: getNextMultiSelectOptions(previousState.selectedTypes, option),
		}));
	}, []);

	const handleFilterWeaknessOptionPress = useCallback((option: PokemonType) => {
		setDraftFilterState(previousState => ({
			...previousState,
			selectedWeaknesses: getNextMultiSelectOptions(previousState.selectedWeaknesses, option),
		}));
	}, []);

	const handleFilterHeightOptionPress = useCallback((option: PokedexHeightOption) => {
		setDraftFilterState(previousState => ({
			...previousState,
			selectedHeights: getNextMultiSelectOptions(previousState.selectedHeights, option),
		}));
	}, []);

	const handleFilterWeightOptionPress = useCallback((option: PokedexWeightOption) => {
		setDraftFilterState(previousState => ({
			...previousState,
			selectedWeights: getNextMultiSelectOptions(previousState.selectedWeights, option),
		}));
	}, []);

	const handleFilterNumberRangeChange = useCallback(
		(numberRange: PokedexFilterState['numberRange']) => {
			setDraftFilterState(previousState => ({
				...previousState,
				numberRange,
			}));
		},
		[],
	);

	const handleFilterReset = useCallback(() => {
		setDraftFilterState(createDefaultFilterState());
	}, []);

	const handleFilterApply = useCallback(() => {
		setAppliedFiltersByMode(previousFiltersByMode =>
			getNextAppliedFiltersByMode({
				currentMode,
				draftFilterState,
				previousFiltersByMode,
			}),
		);
		onCloseFilterSheet();
	}, [currentMode, draftFilterState, onCloseFilterSheet]);

	return {
		draftFilterState,
		activeFilterCount,
		hasActiveFilter,
		handleFilterPress,
		handleFilterTypeOptionPress,
		handleFilterWeaknessOptionPress,
		handleFilterHeightOptionPress,
		handleFilterWeightOptionPress,
		handleFilterNumberRangeChange,
		handleFilterReset,
		handleFilterApply,
	};
};
