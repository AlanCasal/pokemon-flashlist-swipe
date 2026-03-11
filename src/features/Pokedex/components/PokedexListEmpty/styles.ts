import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { usePrimaryFontFamily } from '@hooks/usePrimaryFontFamily';
import { StyleSheet } from 'react-native';

const {
	spacing: { screenHorizontalPadding },
} = sharedStyles;

export const useStyles = () => {
	const primaryFont = usePrimaryFontFamily();

	return StyleSheet.create({
		content: {
			alignItems: 'center',
			justifyContent: 'center',
		},
		contentWithMarginTop: {
			marginTop: 64,
		},
		contentWithPaddingHorizontal: {
			paddingHorizontal: screenHorizontalPadding,
		},
		loadingContent: {
			backgroundColor: 'white',
			flex: 1,
			width: '100%',
		},
		loadingImage: {
			height: 200,
			width: 200,
		},
		message: {
			color: textColor.grey,
			fontFamily: primaryFont,
			fontSize: 16,
			textAlign: 'center',
		},
	});
};
