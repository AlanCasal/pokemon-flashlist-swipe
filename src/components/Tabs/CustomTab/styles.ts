import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

type UseStylesProps = {
	activeColor: string;
	inactiveColor: string;
	isFocused: boolean;
};

const { shadow } = sharedStyles;

export const useStyles = ({ activeColor, inactiveColor, isFocused }: UseStylesProps) => {
	return StyleSheet.create({
		background: {
			borderRadius: 8,
			bottom: 0,
			left: 0,
			overflow: 'hidden',
			position: 'absolute',
			right: 0,
			top: 0,
			...shadow,
		},
		button: {
			alignItems: 'center',
			columnGap: 4,
			flexDirection: 'row',
			justifyContent: 'center',
			padding: 12,
		},
		label: {
			color: isFocused ? activeColor : inactiveColor,
			fontSize: 16,
			fontWeight: isFocused ? 'bold' : 'normal',
		},
	});
};
