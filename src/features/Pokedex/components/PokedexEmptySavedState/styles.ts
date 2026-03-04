import { textColor } from '@constants/colors';
import { usePrimaryFontFamily } from '@hooks/usePrimaryFontFamily';
import { StyleSheet } from 'react-native';

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
		text: {
			color: textColor.grey,
			fontFamily: primaryFont,
			fontSize: 16,
			textAlign: 'center',
		},
		textWithTopSpacing: {
			marginTop: 4,
		},
	});
};
