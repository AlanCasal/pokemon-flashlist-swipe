import type { PokemonType } from '@constants/index';
import type { FlashListRef } from '@shopify/flash-list';
import type { ComponentType, ReactElement, RefObject } from 'react';
import type { SvgProps } from 'react-native-svg';

import type {
	PokedexGenerationOption,
	PokedexHeightOption,
	PokedexMode,
	PokedexSortOption,
	PokedexWeightOption,
	TabBarVisibility,
} from '@/src/types';
import type { PokemonDetails } from '@/src/types/pokemon';
import type { Pokemon } from '@/src/types/pokemonList';

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

export interface ShouldShowFilteredEmptyStateParams {
	filteredPokemonCount: number;
	hasActiveFilter: boolean;
	isFilteringPokemonList: boolean;
	isGenerationActive: boolean;
	isGenerationFilterPending: boolean;
	isSearchActive: boolean;
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

export interface GetNextTabBarVisibilityParams {
	currentOffsetY: number;
	currentVisibility: TabBarVisibility;
	previousOffsetY: number;
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
	activeFilterCount: number;
	hasActiveFilter: boolean;
	hasActiveGeneration: boolean;
	hasActiveSort: boolean;
	isSortEnabled: boolean;
	onFilterPress: () => void;
	onGenerationPress: () => void;
	onClearSearch: () => void;
	onSearchChange: (value: string) => void;
	onSortPress: () => void;
	searchValue: string;
}

export interface PokedexListEmptyProps {
	isEmptySavedPokeBallSaved: boolean;
	isSavedMode: boolean;
	onEmptySavedPokeBallPress: () => void;
	shouldShowFilteredEmptyState: boolean;
	shouldShowLoadingFeedback: boolean;
	shouldShowSearchNotFound: boolean;
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

export interface PokedexFilterNumberRange {
	max: number;
	min: number;
}

export interface PokedexFilterState {
	numberRange: PokedexFilterNumberRange;
	selectedHeights: PokedexHeightOption[];
	selectedTypes: PokemonType[];
	selectedWeaknesses: PokemonType[];
	selectedWeights: PokedexWeightOption[];
}

export interface PokemonTypeDamageRelationsResponse {
	damage_relations: {
		double_damage_from: Array<{ name: string; url: string }>;
		half_damage_from: Array<{ name: string; url: string }>;
		no_damage_from: Array<{ name: string; url: string }>;
	};
}

export type PokemonTypeDamageRelationsByType = Partial<
	Record<PokemonType, PokemonTypeDamageRelationsResponse>
>;

export interface GetDoesPokemonMatchAppliedFiltersParams {
	damageRelationsByType: PokemonTypeDamageRelationsByType;
	filterState: PokedexFilterState;
	pokemon: Pokemon;
	pokemonDetails: PokemonDetails;
}

export type PokedexFiltersByMode = Record<PokedexMode, PokedexFilterState>;

export interface PokedexFilterSheetControllerProps {
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

export interface PokedexScrollToTopProps {
	onPress: () => void;
	visible: boolean;
}

export interface PokedexProps {
	mode?: PokedexMode;
}

export interface PokedexScreenController {
	bottomInset: number;
	backgroundSource: number;
	flashListProps: PokedexFlashListProps;
	filterSheetProps: PokedexFilterSheetControllerProps;
	generationSheetProps: PokedexGenerationSheetControllerProps;
	headerProps: PokedexHeaderProps;
	isAnyBottomSheetOpen: boolean;
	isEmptySavedPokeBallSaved: boolean;
	isSavedMode: boolean;
	isSearchActive: boolean;
	isSearchingPokemon: boolean;
	listRef: RefObject<FlashListRef<Pokemon> | null>;
	onEmptySavedPokeBallPress: () => void;
	scrollToTopProps: PokedexScrollToTopProps;
	shouldDarkenBackgroundForEmptySavedState: boolean;
	shouldShowFilteredEmptyState: boolean;
	shouldShowLoadingFeedback: boolean;
	shouldShowSearchNotFound: boolean;
	sortSheetProps: PokedexSortSheetControllerProps;
	topInset: number;
}
