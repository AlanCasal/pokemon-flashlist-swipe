import { typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

type UseStylesProps = {
	bottomInset: number;
};

const {
	spacing: { screenHorizontalPadding },
} = sharedStyles;

export const useStyles = ({ bottomInset }: UseStylesProps) => {
	return StyleSheet.create({
		button: {
			bottom: bottomInset + 10,
			position: 'absolute',
			right: screenHorizontalPadding,
			zIndex: 40,
		},
		touchable: {
			alignItems: 'center',
			backgroundColor: typeColors.fighting,
			borderRadius: 28,
			elevation: 40,
			height: 56,
			justifyContent: 'center',
			width: 56,
		},
	});
};
