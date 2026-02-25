import type { PokemonType } from '@constants/index';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface PokemonTypeChipProps {
	containerStyle?: StyleProp<ViewStyle>;
	iconFill?: string;
	iconSize?: number;
	labelStyle?: StyleProp<TextStyle>;
	type: PokemonType;
}
