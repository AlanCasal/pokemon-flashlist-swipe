import { useCallback, useMemo, useState } from 'react';

import { PokedexGenerationOption, PokedexSortOption } from '@/src/types';

import { getNextSingleSelectOption } from '../helpers';

export type BottomSheetId = 'sort' | 'generation' | 'filter';

export interface BottomSheetVisibilityState {
	filter: boolean;
	generation: boolean;
	sort: boolean;
}

interface GetNextBottomSheetVisibilityStateParams {
	id: BottomSheetId;
	isOpen: boolean;
	previousState: BottomSheetVisibilityState;
}

interface UsePokedexBottomSheetStateParams {
	isSavedMode: boolean;
}

const INITIAL_VISIBILITY_STATE: BottomSheetVisibilityState = {
	sort: false,
	generation: false,
	filter: false,
};

export const getNextBottomSheetVisibilityState = ({
	id,
	isOpen,
	previousState,
}: GetNextBottomSheetVisibilityStateParams): BottomSheetVisibilityState => ({
	...previousState,
	[id]: isOpen,
});

export const usePokedexBottomSheetState = ({ isSavedMode }: UsePokedexBottomSheetStateParams) => {
	const [visibilityState, setVisibilityState] =
		useState<BottomSheetVisibilityState>(INITIAL_VISIBILITY_STATE);
	const [savedSortOption, setSavedSortOption] = useState<PokedexSortOption | null>(null);
	const [selectedGenerationOption, setSelectedGenerationOption] =
		useState<PokedexGenerationOption | null>(null);

	const setSheetOpenState = useCallback((id: BottomSheetId, isOpen: boolean) => {
		setVisibilityState(previousState =>
			getNextBottomSheetVisibilityState({
				id,
				isOpen,
				previousState,
			}),
		);
	}, []);

	const handleSortPress = useCallback(() => {
		if (!isSavedMode) return;
		setSheetOpenState('sort', true);
	}, [isSavedMode, setSheetOpenState]);

	const handleGenerationPress = useCallback(() => {
		setSheetOpenState('generation', true);
	}, [setSheetOpenState]);

	const handleOpenFilterSheet = useCallback(() => {
		setSheetOpenState('filter', true);
	}, [setSheetOpenState]);

	const handleCloseSortSheet = useCallback(() => {
		setSheetOpenState('sort', false);
	}, [setSheetOpenState]);

	const handleCloseGenerationSheet = useCallback(() => {
		setSheetOpenState('generation', false);
	}, [setSheetOpenState]);

	const handleCloseFilterSheet = useCallback(() => {
		setSheetOpenState('filter', false);
	}, [setSheetOpenState]);

	const handleSortOptionPress = useCallback((option: PokedexSortOption) => {
		setSavedSortOption(previousSortOption => getNextSingleSelectOption(previousSortOption, option));
	}, []);

	const handleGenerationOptionPress = useCallback((option: PokedexGenerationOption) => {
		setSelectedGenerationOption(previousOption =>
			getNextSingleSelectOption(previousOption, option),
		);
	}, []);

	const isAnyBottomSheetOpen = useMemo(
		() => visibilityState.sort || visibilityState.generation || visibilityState.filter,
		[visibilityState.filter, visibilityState.generation, visibilityState.sort],
	);

	return {
		isSortSheetOpen: visibilityState.sort,
		isGenerationSheetOpen: visibilityState.generation,
		isFilterSheetOpen: visibilityState.filter,
		isAnyBottomSheetOpen,
		savedSortOption,
		selectedGenerationOption,
		handleSortPress,
		handleGenerationPress,
		handleOpenFilterSheet,
		handleCloseSortSheet,
		handleCloseGenerationSheet,
		handleCloseFilterSheet,
		handleSortOptionPress,
		handleGenerationOptionPress,
	};
};
