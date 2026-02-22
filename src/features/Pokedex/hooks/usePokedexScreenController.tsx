import PokeCard from '@components/PokeCard';
import { API_URL, SEARCH_DEBOUNCE_MS } from '@constants/api';
import { POKEDEX_NUMBER_RANGE_DEFAULTS } from '@constants/pokedex';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { usePokemonList } from '@hooks/usePokemonList';
import { normalizeSearchTerm, useSearchPokemon } from '@hooks/useSearchPokemon';
import { FlashListRef } from '@shopify/flash-list';
import { useSavedPokemons } from '@store/savedStore';
import texts from '@utils/texts.json';
import { useLocalSearchParams, useSegments } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
	type PokedexGenerationOption,
	type PokedexHeightOption,
	type PokedexMode,
	type PokedexSortOption,
	type PokedexWeightOption,
} from '@/src/types';
import { Pokemon } from '@/src/types/pokemonList';
import type { PokemonType } from '@/src/types/pokemonTypes';

import {
	getActiveSearchValues,
	getAppliedFilterCount,
	getDisplayedPokemonList,
	getFilteredSavedPokemonList,
	getIsSearchNotFoundError,
	getNextMultiSelectOptions,
	getNextSingleSelectOption,
	getSearchedPokemonList,
	getShouldDarkenBackgroundForEmptySavedState,
	getShouldFetchNextPage,
	getShouldShowSearchNotFound,
	getSortedPokemonList,
	normalizeSavedPokemonName,
	shouldShowScrollToTop,
} from '../helpers';
import {
	type PokedexFilterState,
	type PokedexRenderItemParams,
	type PokedexScreenController,
} from '../types';

const createDefaultFilterState = (): PokedexFilterState => ({
	numberRange: {
		min: POKEDEX_NUMBER_RANGE_DEFAULTS.min,
		max: POKEDEX_NUMBER_RANGE_DEFAULTS.max,
	},
	selectedTypes: [],
	selectedWeaknesses: [],
	selectedHeights: [],
	selectedWeights: [],
});

const cloneFilterState = (filterState: PokedexFilterState): PokedexFilterState => ({
	numberRange: { ...filterState.numberRange },
	selectedTypes: [...filterState.selectedTypes],
	selectedWeaknesses: [...filterState.selectedWeaknesses],
	selectedHeights: [...filterState.selectedHeights],
	selectedWeights: [...filterState.selectedWeights],
});

export const usePokedexScreenController = (): PokedexScreenController => {
	const { mode } = useLocalSearchParams<{ mode?: PokedexMode }>();
	const { top, bottom } = useSafeAreaInsets();

	const segments = useSegments();
	const activeTab = segments[segments.length - 1];
	const isSavedMode = mode === 'saved';
	const isCurrentScreen = activeTab === (isSavedMode ? 'saved' : 'pokedex');

	const savedPokemons = useSavedPokemons();
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isFetchingNextPage,
		isError,
		error,
		isRefetching,
		refetch,
	} = usePokemonList(!isSavedMode && isCurrentScreen);

	const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
	const [allSearchValue, setAllSearchValue] = useState('');
	const [savedSearchValue, setSavedSearchValue] = useState('');
	const [isEmptySavedPokeBallSaved, setIsEmptySavedPokeBallSaved] = useState(false);
	const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
	const [savedSortOption, setSavedSortOption] = useState<PokedexSortOption | null>(null);
	const [isGenerationSheetOpen, setIsGenerationSheetOpen] = useState(false);
	const [selectedGenerationOption, setSelectedGenerationOption] =
		useState<PokedexGenerationOption | null>(null);
	const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
	const [draftFilterState, setDraftFilterState] = useState<PokedexFilterState>(() =>
		createDefaultFilterState(),
	);
	const [appliedFiltersByMode, setAppliedFiltersByMode] = useState<{
		all: PokedexFilterState;
		saved: PokedexFilterState;
	}>(() => ({
		all: createDefaultFilterState(),
		saved: createDefaultFilterState(),
	}));

	const debouncedAllSearchValue = useDebouncedValue(allSearchValue, SEARCH_DEBOUNCE_MS);
	const debouncedSavedSearchValue = useDebouncedValue(savedSearchValue, SEARCH_DEBOUNCE_MS);
	const { activeSearchValue, activeDebouncedSearchValue } = getActiveSearchValues({
		isSavedMode,
		allSearchValue,
		savedSearchValue,
		debouncedAllSearchValue,
		debouncedSavedSearchValue,
	});

	const normalizedActiveSearchValue = normalizeSearchTerm(activeDebouncedSearchValue);
	const isSearchActive = normalizedActiveSearchValue.length > 0;
	const backgroundSource = isSavedMode
		? require('@assets/images/wallpaper-misc.jpg')
		: require('@assets/images/wallpaper-light.jpg');

	const listRef = useRef<FlashListRef<Pokemon>>(null);
	const listScrollOffsetRef = useRef(0);

	const {
		data: searchedPokemon,
		isLoading: isSearchingPokemon,
		isError: isSearchError,
		error: searchError,
		refetch: refetchSearch,
	} = useSearchPokemon(
		activeDebouncedSearchValue,
		!isSavedMode && isSearchActive && isCurrentScreen,
	);

	const isSearchNotFoundError = getIsSearchNotFoundError(searchError);

	const pokemonList = useMemo(
		() =>
			data?.pages.reduce<Pokemon[]>((accumulator, page) => accumulator.concat(page.results), []) ??
			[],
		[data],
	);

	const savedPokemonList = useMemo(
		() =>
			Array.from(new Set(savedPokemons.map(normalizeSavedPokemonName)))
				.filter(Boolean)
				.map(name => ({
					name,
					url: `${API_URL}/${name}`,
				})),
		[savedPokemons],
	);

	const searchedPokemonList = useMemo(
		() => getSearchedPokemonList(searchedPokemon),
		[searchedPokemon],
	);

	const filteredSavedPokemonList = useMemo(() => {
		if (!isSavedMode || !isSearchActive) return savedPokemonList;

		return getFilteredSavedPokemonList(savedPokemonList, normalizedActiveSearchValue);
	}, [isSavedMode, isSearchActive, savedPokemonList, normalizedActiveSearchValue]);

	const displayedPokemonList = useMemo(
		() =>
			getDisplayedPokemonList({
				isSearchActive,
				isSavedMode,
				savedPokemonList,
				pokemonList,
				filteredSavedPokemonList,
				searchedPokemonList,
			}),
		[
			isSearchActive,
			isSavedMode,
			savedPokemonList,
			pokemonList,
			filteredSavedPokemonList,
			searchedPokemonList,
		],
	);

	const sortedPokemonList = useMemo(
		() =>
			isSavedMode
				? getSortedPokemonList(displayedPokemonList, savedSortOption)
				: displayedPokemonList,
		[displayedPokemonList, isSavedMode, savedSortOption],
	);

	const shouldShowSearchNotFound = getShouldShowSearchNotFound({
		isSearchActive,
		displayedPokemonCount: displayedPokemonList.length,
		isSavedMode,
		isSearchingPokemon,
		isSearchError,
		isSearchNotFoundError,
	});

	const shouldShowSearchLoadingSpinner =
		isSearchActive && !isSavedMode && isSearchingPokemon && displayedPokemonList.length === 0;

	const shouldDarkenBackgroundForEmptySavedState = getShouldDarkenBackgroundForEmptySavedState({
		isSavedMode,
		isSearchActive,
		savedPokemonCount: savedPokemonList.length,
	});

	const currentMode: PokedexMode = isSavedMode ? 'saved' : 'all';
	const appliedFilterState = appliedFiltersByMode[currentMode];
	const activeFilterCount = getAppliedFilterCount({
		filterState: appliedFilterState,
		defaultRange: POKEDEX_NUMBER_RANGE_DEFAULTS,
	});
	const hasActiveFilter = activeFilterCount > 0;

	const isAnyBottomSheetOpen = isSortSheetOpen || isGenerationSheetOpen || isFilterSheetOpen;

	const handleRefresh = useCallback(() => {
		if (!isSavedMode && isSearchActive) {
			void refetchSearch();
			return;
		}

		void refetch();
	}, [isSavedMode, isSearchActive, refetch, refetchSearch]);

	const handleRenderItem = useCallback(
		({ item }: PokedexRenderItemParams) => (
			<PokeCard
				url={item.url}
				isSavedMode={isSavedMode}
			/>
		),
		[isSavedMode],
	);

	const handleScrollToTop = useCallback(() => {
		listRef.current?.scrollToOffset({ offset: 0, animated: true });
	}, []);

	const handleEmptySavedPokeBallPress = useCallback(() => {
		setIsEmptySavedPokeBallSaved(previousValue => !previousValue);
	}, []);

	const handleSortPress = useCallback(() => {
		if (!isSavedMode) return;
		setIsSortSheetOpen(true);
	}, [isSavedMode]);

	const handleGenerationPress = useCallback(() => {
		setIsGenerationSheetOpen(true);
	}, []);

	const handleCloseSortSheet = useCallback(() => {
		setIsSortSheetOpen(false);
	}, []);

	const handleCloseGenerationSheet = useCallback(() => {
		setIsGenerationSheetOpen(false);
	}, []);

	const handleCloseFilterSheet = useCallback(() => {
		setIsFilterSheetOpen(false);
	}, []);

	const handleSortOptionPress = useCallback((option: PokedexSortOption) => {
		setSavedSortOption(previousSortOption => getNextSingleSelectOption(previousSortOption, option));
	}, []);

	const handleGenerationOptionPress = useCallback((option: PokedexGenerationOption) => {
		setSelectedGenerationOption(previousOption =>
			getNextSingleSelectOption(previousOption, option),
		);
	}, []);

	const handleFilterPress = useCallback(() => {
		setDraftFilterState(cloneFilterState(appliedFilterState));
		setIsFilterSheetOpen(true);
	}, [appliedFilterState]);

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
		setAppliedFiltersByMode(previousState => ({
			...previousState,
			[currentMode]: cloneFilterState(draftFilterState),
		}));
		setIsFilterSheetOpen(false);
	}, [currentMode, draftFilterState]);

	const handleListScroll = useCallback((offsetY: number) => {
		listScrollOffsetRef.current = offsetY;
		setShowScrollToTopButton(shouldShowScrollToTop(offsetY));
	}, []);

	const handleFlashListScroll = useCallback(
		({ nativeEvent }: { nativeEvent: { contentOffset: { y: number } } }) => {
			handleListScroll(nativeEvent.contentOffset.y);
		},
		[handleListScroll],
	);

	const handleEndReached = useCallback(() => {
		const shouldFetchNextPage = getShouldFetchNextPage({
			isSavedMode,
			isSearchActive,
			hasNextPage,
			isFetchingNextPage,
		});

		if (!shouldFetchNextPage) return;
		void fetchNextPage();
	}, [fetchNextPage, hasNextPage, isFetchingNextPage, isSavedMode, isSearchActive]);

	const handleSearchChange = useCallback(
		(value: string) => {
			if (isSavedMode) {
				setSavedSearchValue(value);
				return;
			}

			setAllSearchValue(value);
		},
		[isSavedMode],
	);

	const handleClearSearch = useCallback(() => {
		if (isSavedMode) {
			setSavedSearchValue('');
			return;
		}

		setAllSearchValue('');
	}, [isSavedMode]);

	useEffect(() => {
		if (!isCurrentScreen) return;

		listRef.current?.scrollToOffset({ offset: 0, animated: false });
		listScrollOffsetRef.current = 0;
		const frameId = requestAnimationFrame(() => {
			setShowScrollToTopButton(false);
		});

		return () => {
			cancelAnimationFrame(frameId);
		};
	}, [isCurrentScreen, isSavedMode, normalizedActiveSearchValue]);

	useEffect(() => {
		if (!isCurrentScreen || isSavedMode) return;
		if (!isError) return;

		Alert.alert(texts.alerts.errorFetchingPokemonTitle, error.message);
	}, [isCurrentScreen, isSavedMode, isError, error]);

	useEffect(() => {
		if (
			isCurrentScreen &&
			!isSavedMode &&
			isSearchActive &&
			isSearchError &&
			!isSearchNotFoundError &&
			searchError
		) {
			Alert.alert(texts.alerts.errorFetchingPokemonTitle, searchError.message);
		}
	}, [
		isCurrentScreen,
		isSavedMode,
		isSearchActive,
		isSearchError,
		isSearchNotFoundError,
		searchError,
	]);

	const headerProps = useMemo(
		() => ({
			searchValue: activeSearchValue,
			activeFilterCount,
			hasActiveFilter,
			hasActiveGeneration: Boolean(selectedGenerationOption),
			hasActiveSort: isSavedMode && Boolean(savedSortOption),
			isSortEnabled: isSavedMode,
			onSearchChange: handleSearchChange,
			onClearSearch: handleClearSearch,
			onGenerationPress: handleGenerationPress,
			onSortPress: handleSortPress,
			onFilterPress: handleFilterPress,
		}),
		[
			activeSearchValue,
			activeFilterCount,
			hasActiveFilter,
			selectedGenerationOption,
			isSavedMode,
			savedSortOption,
			handleSearchChange,
			handleClearSearch,
			handleGenerationPress,
			handleSortPress,
			handleFilterPress,
		],
	);

	const flashListProps = useMemo(
		() => ({
			data: sortedPokemonList,
			renderItem: handleRenderItem,
			refreshing: isRefetching,
			onRefresh: handleRefresh,
			onScroll: handleFlashListScroll,
			onEndReached: handleEndReached,
			listFooterComponent:
				isFetchingNextPage && !isSavedMode && !isSearchActive ? <ActivityIndicator /> : null,
		}),
		[
			sortedPokemonList,
			handleRenderItem,
			isRefetching,
			handleRefresh,
			handleFlashListScroll,
			handleEndReached,
			isFetchingNextPage,
			isSavedMode,
			isSearchActive,
		],
	);

	const sortSheetProps = useMemo(
		() => ({
			isOpen: isSavedMode && isSortSheetOpen,
			selectedOption: savedSortOption,
			onClose: handleCloseSortSheet,
			onOptionPress: handleSortOptionPress,
		}),
		[isSavedMode, isSortSheetOpen, savedSortOption, handleCloseSortSheet, handleSortOptionPress],
	);

	const generationSheetProps = useMemo(
		() => ({
			isOpen: isGenerationSheetOpen,
			selectedOption: selectedGenerationOption,
			onClose: handleCloseGenerationSheet,
			onOptionPress: handleGenerationOptionPress,
		}),
		[
			isGenerationSheetOpen,
			selectedGenerationOption,
			handleCloseGenerationSheet,
			handleGenerationOptionPress,
		],
	);

	const filterSheetProps = useMemo(
		() => ({
			isOpen: isFilterSheetOpen,
			draftState: draftFilterState,
			numberRangeDefaults: POKEDEX_NUMBER_RANGE_DEFAULTS,
			onClose: handleCloseFilterSheet,
			onApply: handleFilterApply,
			onReset: handleFilterReset,
			onTypeOptionPress: handleFilterTypeOptionPress,
			onWeaknessOptionPress: handleFilterWeaknessOptionPress,
			onHeightOptionPress: handleFilterHeightOptionPress,
			onWeightOptionPress: handleFilterWeightOptionPress,
			onNumberRangeChange: handleFilterNumberRangeChange,
		}),
		[
			draftFilterState,
			isFilterSheetOpen,
			handleCloseFilterSheet,
			handleFilterApply,
			handleFilterReset,
			handleFilterTypeOptionPress,
			handleFilterWeaknessOptionPress,
			handleFilterHeightOptionPress,
			handleFilterWeightOptionPress,
			handleFilterNumberRangeChange,
		],
	);

	const scrollToTopProps = useMemo(
		() => ({
			visible: showScrollToTopButton,
			onPress: handleScrollToTop,
		}),
		[showScrollToTopButton, handleScrollToTop],
	);

	return {
		topInset: top,
		bottomInset: bottom,
		backgroundSource,
		headerProps,
		flashListProps,
		sortSheetProps,
		generationSheetProps,
		filterSheetProps,
		scrollToTopProps,
		listRef,
		isInitialLoading: isLoading && !data,
		isSavedMode,
		isAnyBottomSheetOpen,
		isSearchActive,
		isSearchingPokemon,
		isEmptySavedPokeBallSaved,
		onEmptySavedPokeBallPress: handleEmptySavedPokeBallPress,
		shouldShowSearchLoadingSpinner,
		shouldShowSearchNotFound,
		shouldDarkenBackgroundForEmptySavedState,
	};
};
