import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';

export interface CustomButtonProps extends TouchableOpacityProps {
	backgroundColor?: string;
	borderColor?: string;
	label?: string;
	labelStyle?: StyleProp<TextStyle>;
	leftAdornment?: ReactNode;
	style?: StyleProp<ViewStyle>;
	textColor?: string;
}
