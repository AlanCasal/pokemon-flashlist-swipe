import PokeCard from '@components/PokeCard';
import { API_URL } from '@constants/api';
import { POKEDEX_NUMBER_RANGE_DEFAULTS } from '@constants/pokedex';
import { usePokemonCatalog } from '@hooks/usePokemonCatalog';
import { usePokemonList } from '@hooks/usePokemonList';
import { useSearchPokemon } from '@hooks/useSearchPokemon';
import { FlashListRef } from '@shopify/flash-list';
import { useSavedPokemons } from '@store/savedStore';
import { useShowToast } from '@store/toastStore';
import texts from '@utils/texts.json';
import { useLocalSearchParams, useSegments } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type PokedexMode } from '@/src/types';
import type { Pokemon } from '@/src/types/pokemonList';

import {
	getDisplayedPokemonList,
	getEmptySavedToastConfig,
	getFilteredSavedPokemonList,
	getIsSearchNotFoundError,
	getSearchedPokemonList,
	getShouldDarkenBackgroundForEmptySavedState,
	getShouldFetchNextPage,
	getShouldShowSearchNotFound,
	getSortedPokemonList,
	normalizeSavedPokemonName,
	shouldShowScrollToTop,
} from '../helpers';
import { type PokedexRenderItemParams, type PokedexScreenController } from '../types';
import { usePokedexAppliedFilters } from './usePokedexAppliedFilters';
import { usePokedexBottomSheetState } from './usePokedexBottomSheetState';
import { usePokedexFilterState } from './usePokedexFilterState';
import { usePokedexSearchState } from './usePokedexSearchState';

export const usePokedexScreenController = (): PokedexScreenController => {
	const { mode } = useLocalSearchParams<{ mode?: PokedexMode }>();
	const { top, bottom } = useSafeAreaInsets();

	const segments = useSegments();
	const activeTab = segments[segments.length - 1];
	const isSavedMode = mode === 'saved';
	const isCurrentScreen = activeTab === (isSavedMode ? 'saved' : 'pokedex');
	const currentMode: PokedexMode = isSavedMode ? 'saved' : 'all';

	const savedPokemons = useSavedPokemons();
	const showToast = useShowToast();

	const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
	const [isEmptySavedPokeBallSaved, setIsEmptySavedPokeBallSaved] = useState(false);

	const {
		activeDebouncedSearchValue,
		activeSearchValue,
		normalizedActiveSearchValue,
		isSearchActive,
		handleSearchChange,
		handleClearSearch,
	} = usePokedexSearchState({ isSavedMode });

	const bottomSheetState = usePokedexBottomSheetState({ isSavedMode });

	const {
		draftFilterState,
		appliedFilterState,
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
	} = usePokedexFilterState({
		currentMode,
		onOpenFilterSheet: bottomSheetState.handleOpenFilterSheet,
		onCloseFilterSheet: bottomSheetState.handleCloseFilterSheet,
	});
	const shouldUseCatalogForAllMode =
		isCurrentScreen && !isSavedMode && !isSearchActive && hasActiveFilter;

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
	} = usePokemonList(!isSavedMode && isCurrentScreen && !shouldUseCatalogForAllMode);

	const {
		data: pokemonCatalogList,
		isLoading: isPokemonCatalogLoading,
		error: pokemonCatalogError,
		isError: isPokemonCatalogError,
		refetch: refetchPokemonCatalog,
	} = usePokemonCatalog(shouldUseCatalogForAllMode);

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

	const paginatedPokemonList = useMemo(
		() =>
			data?.pages.reduce<Pokemon[]>((accumulator, page) => accumulator.concat(page.results), []) ??
			[],
		[data],
	);
	const allModeBasePokemonList = useMemo(
		() => (shouldUseCatalogForAllMode ? (pokemonCatalogList ?? []) : paginatedPokemonList),
		[paginatedPokemonList, pokemonCatalogList, shouldUseCatalogForAllMode],
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
				pokemonList: allModeBasePokemonList,
				filteredSavedPokemonList,
				searchedPokemonList,
			}),
		[
			isSearchActive,
			isSavedMode,
			savedPokemonList,
			allModeBasePokemonList,
			filteredSavedPokemonList,
			searchedPokemonList,
		],
	);
	const { filteredPokemonList, isFilteringPokemonList, isFilterError, filterError } =
		usePokedexAppliedFilters({
			candidatePokemonList: displayedPokemonList,
			appliedFilterState,
			enabled: isCurrentScreen,
		});

	const sortedPokemonList = useMemo(
		() =>
			isSavedMode
				? getSortedPokemonList(filteredPokemonList, bottomSheetState.savedSortOption)
				: filteredPokemonList,
		[filteredPokemonList, isSavedMode, bottomSheetState.savedSortOption],
	);

	const shouldShowSearchNotFound =
		!isFilteringPokemonList &&
		getShouldShowSearchNotFound({
			isSearchActive,
			displayedPokemonCount: sortedPokemonList.length,
			isSavedMode,
			isSearchingPokemon,
			isSearchError,
			isSearchNotFoundError,
		});

	const shouldShowSearchLoadingSpinner =
		isSearchActive &&
		!isSavedMode &&
		(isSearchingPokemon || isFilteringPokemonList) &&
		sortedPokemonList.length === 0;

	const shouldDarkenBackgroundForEmptySavedState = getShouldDarkenBackgroundForEmptySavedState({
		isSavedMode,
		isSearchActive,
		savedPokemonCount: savedPokemonList.length,
	});

	const handleRefresh = useCallback(() => {
		if (shouldUseCatalogForAllMode) {
			void refetchPokemonCatalog();
			return;
		}

		if (!isSavedMode && isSearchActive) {
			void refetchSearch();
			return;
		}

		void refetch();
	}, [
		isSavedMode,
		isSearchActive,
		refetch,
		refetchPokemonCatalog,
		refetchSearch,
		shouldUseCatalogForAllMode,
	]);

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
		setIsEmptySavedPokeBallSaved(previousValue => {
			const nextValue = !previousValue;
			showToast(getEmptySavedToastConfig(nextValue));
			return nextValue;
		});
	}, [showToast]);

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
		if (shouldUseCatalogForAllMode) return;

		const shouldFetchNextPage = getShouldFetchNextPage({
			isSavedMode,
			isSearchActive,
			hasNextPage,
			isFetchingNextPage,
		});

		if (!shouldFetchNextPage) return;
		void fetchNextPage();
	}, [
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isSavedMode,
		isSearchActive,
		shouldUseCatalogForAllMode,
	]);

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
	}, [activeFilterCount, isCurrentScreen, isSavedMode, normalizedActiveSearchValue]);

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

	useEffect(() => {
		if (!isCurrentScreen || !isPokemonCatalogError || !pokemonCatalogError) return;

		Alert.alert(texts.alerts.errorFetchingPokemonTitle, pokemonCatalogError.message);
	}, [isCurrentScreen, isPokemonCatalogError, pokemonCatalogError]);

	useEffect(() => {
		if (!isCurrentScreen || !isFilterError || !filterError) return;

		Alert.alert(texts.alerts.errorFetchingPokemonTitle, filterError.message);
	}, [isCurrentScreen, isFilterError, filterError]);

	const headerProps = useMemo(
		() => ({
			searchValue: activeSearchValue,
			activeFilterCount,
			hasActiveFilter,
			hasActiveGeneration: Boolean(bottomSheetState.selectedGenerationOption),
			hasActiveSort: isSavedMode && Boolean(bottomSheetState.savedSortOption),
			isSortEnabled: isSavedMode,
			onSearchChange: handleSearchChange,
			onClearSearch: handleClearSearch,
			onGenerationPress: bottomSheetState.handleGenerationPress,
			onSortPress: bottomSheetState.handleSortPress,
			onFilterPress: handleFilterPress,
		}),
		[
			activeSearchValue,
			activeFilterCount,
			hasActiveFilter,
			bottomSheetState.selectedGenerationOption,
			bottomSheetState.savedSortOption,
			isSavedMode,
			handleSearchChange,
			handleClearSearch,
			bottomSheetState.handleGenerationPress,
			bottomSheetState.handleSortPress,
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
				(isFetchingNextPage && !isSavedMode && !isSearchActive && !shouldUseCatalogForAllMode) ||
				(isFilteringPokemonList && !isSearchActive && sortedPokemonList.length > 0) ? (
					<ActivityIndicator />
				) : null,
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
			isFilteringPokemonList,
			shouldUseCatalogForAllMode,
		],
	);

	const sortSheetProps = useMemo(
		() => ({
			isOpen: isSavedMode && bottomSheetState.isSortSheetOpen,
			selectedOption: bottomSheetState.savedSortOption,
			onClose: bottomSheetState.handleCloseSortSheet,
			onOptionPress: bottomSheetState.handleSortOptionPress,
		}),
		[
			isSavedMode,
			bottomSheetState.isSortSheetOpen,
			bottomSheetState.savedSortOption,
			bottomSheetState.handleCloseSortSheet,
			bottomSheetState.handleSortOptionPress,
		],
	);

	const generationSheetProps = useMemo(
		() => ({
			isOpen: bottomSheetState.isGenerationSheetOpen,
			selectedOption: bottomSheetState.selectedGenerationOption,
			onClose: bottomSheetState.handleCloseGenerationSheet,
			onOptionPress: bottomSheetState.handleGenerationOptionPress,
		}),
		[
			bottomSheetState.isGenerationSheetOpen,
			bottomSheetState.selectedGenerationOption,
			bottomSheetState.handleCloseGenerationSheet,
			bottomSheetState.handleGenerationOptionPress,
		],
	);

	const filterSheetProps = useMemo(
		() => ({
			isOpen: bottomSheetState.isFilterSheetOpen,
			draftState: draftFilterState,
			numberRangeDefaults: POKEDEX_NUMBER_RANGE_DEFAULTS,
			onClose: bottomSheetState.handleCloseFilterSheet,
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
			bottomSheetState.isFilterSheetOpen,
			bottomSheetState.handleCloseFilterSheet,
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

	const isLoadingDefaultModeData = isLoading && !data && !shouldUseCatalogForAllMode;

	const isLoadingAllModeCatalog =
		shouldUseCatalogForAllMode && isPokemonCatalogLoading && !pokemonCatalogList;

	const isFilteringWithNoResults =
		!isSearchActive && hasActiveFilter && isFilteringPokemonList && sortedPokemonList.length === 0;

	const isInitialLoading =
		isLoadingDefaultModeData || isLoadingAllModeCatalog || isFilteringWithNoResults;

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
		isInitialLoading,
		isSavedMode,
		isAnyBottomSheetOpen: bottomSheetState.isAnyBottomSheetOpen,
		isSearchActive,
		isSearchingPokemon,
		isEmptySavedPokeBallSaved,
		onEmptySavedPokeBallPress: handleEmptySavedPokeBallPress,
		shouldShowSearchLoadingSpinner,
		shouldShowSearchNotFound,
		shouldDarkenBackgroundForEmptySavedState,
	};
};
