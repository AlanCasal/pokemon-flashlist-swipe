import PokeCard from '@components/PokeCard';
import { API_URL } from '@constants/api';
import { POKEDEX_NUMBER_RANGE_DEFAULTS } from '@constants/pokedex';
import { usePokemonList } from '@hooks/usePokemonList';
import { useSearchPokemon } from '@hooks/useSearchPokemon';
import { FlashListRef } from '@shopify/flash-list';
import { useSavedPokemons } from '@store/savedStore';
import texts from '@utils/texts.json';
import { useLocalSearchParams, useSegments } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type PokedexMode } from '@/src/types';
import { Pokemon } from '@/src/types/pokemonList';

import {
	getDisplayedPokemonList,
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
				? getSortedPokemonList(displayedPokemonList, bottomSheetState.savedSortOption)
				: displayedPokemonList,
		[displayedPokemonList, isSavedMode, bottomSheetState.savedSortOption],
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
