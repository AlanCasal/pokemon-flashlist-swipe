import { textColor, typeColors } from '@constants/colors';
import { usePrimaryFontFamily } from '@hooks/usePrimaryFontFamily';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
	const primaryFont = usePrimaryFontFamily();
	const { bottom, top } = useSafeAreaInsets();

	return StyleSheet.create({
		bottomDots: {
			bottom: bottom + 36,
			left: -36,
		},
		topDots: {
			right: -28,
			top: top + 34,
		},
		content: {
			alignSelf: 'center',
			gap: 24,
			maxWidth: 420,
			width: '100%',
		},
		footer: {
			alignItems: 'center',
		},
		formContent: {
			gap: 16,
		},
		header: {
			alignItems: 'center',
			gap: 8,
		},
		keyboardRoot: {
			flex: 1,
		},
		root: {
			backgroundColor: typeColors.dragon,
			flex: 1,
		},
		scrollContent: {
			flexGrow: 1,
			justifyContent: 'center',
			paddingBottom: Math.max(bottom + 40, 40),
			paddingHorizontal: 24,
			paddingTop: top + 72,
		},
		subtitle: {
			color: textColor.light,
			fontSize: 16,
			lineHeight: 24,
			maxWidth: 320,
			opacity: 0.92,
			textAlign: 'center',
		},
		title: {
			color: textColor.light,
			fontFamily: primaryFont,
			fontSize: 28,
			lineHeight: 34,
			maxWidth: '100%',
			paddingHorizontal: 16,
			textAlign: 'center',
			width: '100%',
		},
	});
};
