import { textColor } from '@constants/colors';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const VERTICAL_CONTAINER_PADDING = 32;

export const useStyles = () => {
	const { bottom } = useSafeAreaInsets();

	return StyleSheet.create({
		container: {
			flex: 1,
		},
		evolutionContainer: {
			paddingBottom: bottom + VERTICAL_CONTAINER_PADDING,
			paddingHorizontal: 24,
			paddingTop: VERTICAL_CONTAINER_PADDING,
		},
		feedbackText: {
			color: textColor.grey,
			fontSize: 18,
			fontWeight: '600',
			textAlign: 'center',
		},
		loadingContainer: {
			alignItems: 'center',
			justifyContent: 'center',
			paddingVertical: 72,
		},
		placeholderContainer: {
			alignItems: 'center',
			justifyContent: 'center',
			minHeight: 420,
			paddingHorizontal: 24,
		},
		placeholderText: {
			color: textColor.dark,
			fontSize: 26,
			fontWeight: '700',
		},
	});
};
