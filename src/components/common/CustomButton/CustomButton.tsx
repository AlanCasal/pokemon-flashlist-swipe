import { sharedStyles } from '@constants/sharedStyles';
import { Text, TouchableOpacity, View } from 'react-native';

import { useStyles } from './styles';
import type { CustomButtonProps } from './types';

const {
	opacity: { active: activeOpacity },
} = sharedStyles;

const CustomButton = ({
	backgroundColor,
	borderColor,
	disabled,
	label,
	labelStyle,
	leftAdornment,
	style,
	textColor,
	...props
}: CustomButtonProps) => {
	const styles = useStyles({ backgroundColor, borderColor, disabled, textColor });

	return (
		<TouchableOpacity
			{...props}
			disabled={disabled}
			activeOpacity={activeOpacity}
			style={[styles.button, style]}
		>
			{leftAdornment ? <View>{leftAdornment}</View> : null}
			{label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
		</TouchableOpacity>
	);
};

export default CustomButton;
