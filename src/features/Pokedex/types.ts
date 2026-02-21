import type { FlashListRef } from '@shopify/flash-list';
import type { ComponentType, ReactElement, RefObject } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import type { PokedexGenerationOption, PokedexSortOption } from '@/src/types';
import { Pokemon } from '@/src/types/pokemonList';

export interface EmptySavedTextParts {
	bottomLines: string[];
	iconPrefix: string;
	iconSuffix: string;
	shouldRenderIcon: boolean;
	topLines: string[];
}

export interface ShouldShowSearchNotFoundParams {
	isSearchActive: boolean;
	displayedPokemonCount: number;
	isSavedMode: boolean;
	isSearchingPokemon: boolean;
	isSearchError: boolean;
	isSearchNotFoundError: boolean;
}

export interface GetActiveSearchValuesParams {
	allSearchValue: string;
	debouncedAllSearchValue: string;
	debouncedSavedSearchValue: string;
	isSavedMode: boolean;
	savedSearchValue: string;
}

export interface ActiveSearchValues {
	activeDebouncedSearchValue: string;
	activeSearchValue: string;
}

export interface GetDisplayedPokemonListParams {
	filteredSavedPokemonList: Pokemon[];
	isSavedMode: boolean;
	isSearchActive: boolean;
	pokemonList: Pokemon[];
	savedPokemonList: Pokemon[];
	searchedPokemonList: Pokemon[];
}

export interface ShouldFetchNextPageParams {
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	isSavedMode: boolean;
	isSearchActive: boolean;
}

export interface ShouldDarkenBackgroundForEmptySavedStateParams {
	isSavedMode: boolean;
	isSearchActive: boolean;
	savedPokemonCount: number;
}

export interface PokedexRenderItemParams {
	item: Pokemon;
}

export interface PokedexFlashListScrollEvent {
	nativeEvent: {
		contentOffset: {
			y: number;
		};
	};
}

export enum PokedexHeaderActionId {
	Generation = 'generation',
	Sort = 'sort',
	Filter = 'filter',
}

export interface HeaderAction {
	accessibilityLabel: string;
	disabled?: boolean;
	Icon: ComponentType<SvgProps>;
	id: PokedexHeaderActionId;
	onPress: () => void;
	testID: string;
}

export interface PokedexHeaderProps {
	hasActiveGeneration: boolean;
	hasActiveSort: boolean;
	isSortEnabled: boolean;
	onFilterPress: () => void;
	onGenerationPress: () => void;
	onClearSearch: () => void;
	onSearchChange: (value: string) => void;
	onSortPress: () => void;
	searchValue: string;
	topInset: number;
}

export interface PokedexListEmptyProps {
	isEmptySavedPokeBallSaved: boolean;
	isSavedMode: boolean;
	isSearchActive: boolean;
	isSearchingPokemon: boolean;
	onEmptySavedPokeBallPress: () => void;
	shouldShowSearchNotFound: boolean;
	spinnerAnimatedStyle: StyleProp<ViewStyle>;
}

export interface PokedexFlashListProps {
	data: Pokemon[];
	listFooterComponent: ReactElement | null;
	onEndReached: () => void;
	onRefresh: () => void;
	onScroll: (event: PokedexFlashListScrollEvent) => void;
	refreshing: boolean;
	renderItem: ({ item }: PokedexRenderItemParams) => ReactElement;
}

export interface PokedexSortSheetControllerProps {
	isOpen: boolean;
	onClose: () => void;
	onOptionPress: (option: PokedexSortOption) => void;
	selectedOption: PokedexSortOption | null;
}

export interface PokedexGenerationSheetControllerProps {
	isOpen: boolean;
	onClose: () => void;
	onOptionPress: (option: PokedexGenerationOption) => void;
	selectedOption: PokedexGenerationOption | null;
}

export interface PokedexScrollToTopProps {
	onPress: () => void;
	visible: boolean;
}

export interface PokedexScreenController {
	backgroundSource: number;
	bottomInset: number;
	flashListProps: PokedexFlashListProps;
	generationSheetProps: PokedexGenerationSheetControllerProps;
	headerProps: PokedexHeaderProps;
	isAnyBottomSheetOpen: boolean;
	isEmptySavedPokeBallSaved: boolean;
	isInitialLoading: boolean;
	isSavedMode: boolean;
	isSearchActive: boolean;
	isSearchingPokemon: boolean;
	listRef: RefObject<FlashListRef<Pokemon> | null>;
	onEmptySavedPokeBallPress: () => void;
	scrollToTopProps: PokedexScrollToTopProps;
	shouldDarkenBackgroundForEmptySavedState: boolean;
	shouldShowSearchLoadingSpinner: boolean;
	shouldShowSearchNotFound: boolean;
	sortSheetProps: PokedexSortSheetControllerProps;
	topInset: number;
}
