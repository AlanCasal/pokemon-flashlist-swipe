import { textColor } from '@constants/colors';
import { usePrimaryFontFamily } from '@hooks/usePrimaryFontFamily';
import { StyleSheet, type TextStyle } from 'react-native';

export const createEmptyStateTextStyle = (primaryFont?: string): TextStyle => ({
	color: textColor.grey,
	fontFamily: primaryFont,
	fontSize: 16,
	textAlign: 'center' as const,
});

export const useStyles = () => {
	const primaryFont = usePrimaryFontFamily();

	return StyleSheet.create({
		inlineRow: {
			alignItems: 'center',
			flexDirection: 'row',
			justifyContent: 'center',
			marginTop: 4,
		},
		spacer: {
			height: 16,
		},
		text: createEmptyStateTextStyle(primaryFont),
		textWithTopSpacing: {
			marginTop: 4,
		},
	});
};
