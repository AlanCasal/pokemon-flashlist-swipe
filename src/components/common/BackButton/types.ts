import type { StyleProp, ViewStyle } from 'react-native';

export interface BackButtonProps {
	containerStyle?: StyleProp<ViewStyle>;
	iconColor?: string;
	iconSize?: number;
	onPress?: () => void;
}
