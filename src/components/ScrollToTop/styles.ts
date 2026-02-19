import { typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

type UseStylesProps = {
	bottomInset: number;
};

export const useStyles = ({ bottomInset }: UseStylesProps) => {
	return StyleSheet.create({
		button: {
			alignItems: 'center',
			backgroundColor: typeColors.fighting,
			borderRadius: 28,
			bottom: bottomInset + 10,
			elevation: 40,
			height: 56,
			justifyContent: 'center',
			position: 'absolute',
			right: sharedStyles.spacing.screenHorizontalPadding,
			width: 56,
			zIndex: 40,
		},
	});
};
