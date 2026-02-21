import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const {
	spacing: { screenHorizontalPadding },
	typography: { primaryFont },
} = sharedStyles;

const styles = StyleSheet.create({
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
	message: {
		color: textColor.grey,
		fontFamily: primaryFont,
		fontSize: 16,
		textAlign: 'center',
	},
});

export default styles;
