import { textColor } from '@constants/colors';
import { StyleSheet } from 'react-native';

const VERTICAL_CONTAINER_PADDING = 32;

export const useStyles = () =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		placeholderContainer: {
			alignItems: 'center',
			justifyContent: 'center',
			minHeight: 420,
			paddingHorizontal: 24,
			paddingVertical: VERTICAL_CONTAINER_PADDING,
		},
		placeholderText: {
			color: textColor.dark,
			fontSize: 26,
			fontWeight: '700',
			textAlign: 'center',
		},
	});
