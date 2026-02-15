import type { ComponentType } from 'react';
import type { SvgProps } from 'react-native-svg';

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
