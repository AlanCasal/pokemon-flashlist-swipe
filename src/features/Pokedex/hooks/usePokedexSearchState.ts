import { SEARCH_DEBOUNCE_MS } from '@constants/api';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { useCallback, useMemo, useState } from 'react';

import { getActiveSearchValues } from '../helpers';

interface SearchValuesByMode {
	allSearchValue: string;
	savedSearchValue: string;
}

interface GetNextSearchValuesParams {
	currentValues: SearchValuesByMode;
	isSavedMode: boolean;
	nextValue: string;
}

interface UsePokedexSearchStateParams {
	isSavedMode: boolean;
}

export const normalizePokedexSearchTerm = (searchTerm: string) => searchTerm.trim().toLowerCase();

export const getNextSearchValues = ({
	currentValues,
	isSavedMode,
	nextValue,
}: GetNextSearchValuesParams): SearchValuesByMode => {
	if (isSavedMode) {
		return {
			...currentValues,
			savedSearchValue: nextValue,
		};
	}

	return {
		...currentValues,
		allSearchValue: nextValue,
	};
};

export const usePokedexSearchState = ({ isSavedMode }: UsePokedexSearchStateParams) => {
	const [searchValuesByMode, setSearchValuesByMode] = useState<SearchValuesByMode>({
		allSearchValue: '',
		savedSearchValue: '',
	});

	const { allSearchValue, savedSearchValue } = searchValuesByMode;
	const debouncedAllSearchValue = useDebouncedValue(allSearchValue, SEARCH_DEBOUNCE_MS);
	const debouncedSavedSearchValue = useDebouncedValue(savedSearchValue, SEARCH_DEBOUNCE_MS);

	const { activeDebouncedSearchValue, activeSearchValue } = getActiveSearchValues({
		isSavedMode,
		allSearchValue,
		savedSearchValue,
		debouncedAllSearchValue,
		debouncedSavedSearchValue,
	});

	const normalizedActiveSearchValue = useMemo(
		() => normalizePokedexSearchTerm(activeDebouncedSearchValue),
		[activeDebouncedSearchValue],
	);
	const isSearchActive = normalizedActiveSearchValue.length > 0;

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearchValuesByMode(previousValues =>
				getNextSearchValues({
					currentValues: previousValues,
					isSavedMode,
					nextValue: value,
				}),
			);
		},
		[isSavedMode],
	);

	const handleClearSearch = useCallback(() => {
		setSearchValuesByMode(previousValues =>
			getNextSearchValues({
				currentValues: previousValues,
				isSavedMode,
				nextValue: '',
			}),
		);
	}, [isSavedMode]);

	return {
		activeDebouncedSearchValue,
		activeSearchValue,
		normalizedActiveSearchValue,
		isSearchActive,
		handleSearchChange,
		handleClearSearch,
	};
};
