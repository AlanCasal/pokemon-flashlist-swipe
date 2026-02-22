import type { ImageProps } from 'expo-image';
import type { ImageStyle, StyleProp, ViewStyle } from 'react-native';

export interface PokemonAvatarProps {
	contentFit?: ImageProps['contentFit'];
	imageStyle?: StyleProp<ImageStyle>;
	isSaved?: boolean;
	pokeballContainerStyle?: StyleProp<ViewStyle>;
	pokeballSize?: number;
	uri: string;
}
