import type { ComponentType } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SvgProps } from 'react-native-svg';

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
