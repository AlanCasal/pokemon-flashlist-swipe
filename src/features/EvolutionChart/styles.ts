import { textColor } from '@constants/colors';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
	const { bottom } = useSafeAreaInsets();

	return StyleSheet.create({
		container: {
			flex: 1,
		},
		evolutionContainer: {
			gap: 22,
			paddingBottom: bottom + 32,
			paddingHorizontal: 24,
			paddingTop: 32,
		},
		evolutionTitle: {
			color: '#FD7D24',
			fontSize: 16,
			fontWeight: '700',
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
