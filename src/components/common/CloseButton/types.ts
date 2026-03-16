import type { StyleProp, ViewStyle } from 'react-native';

export interface CloseButtonProps {
	accessibilityLabel: string;
	containerStyle?: StyleProp<ViewStyle>;
	iconColor?: string;
	iconSize?: number;
	onPress: () => void;
	testID?: string;
}
