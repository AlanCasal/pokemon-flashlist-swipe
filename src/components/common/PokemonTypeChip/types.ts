import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { PokemonType } from '@/src/types/pokemonTypes';

export interface PokemonTypeChipProps {
	containerStyle?: StyleProp<ViewStyle>;
	iconFill?: string;
	iconSize?: number;
	labelStyle?: StyleProp<TextStyle>;
	type: PokemonType;
}
