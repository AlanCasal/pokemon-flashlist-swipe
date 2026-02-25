import type { PokemonType } from '@constants/index';
import type { TextStyle, ViewStyle } from 'react-native';
import type { AnimatedStyle } from 'react-native-reanimated';

export interface PokemonHeaderProps {
	compactTitleStyle: AnimatedStyle<TextStyle>;
	displayName: string;
	formattedId: string;
	heroImageUrl?: string | null;
	heroStyle: AnimatedStyle<ViewStyle>;
	isPokemonLoading: boolean;
	isSaved: boolean;
	typeChips: PokemonType[];
}
