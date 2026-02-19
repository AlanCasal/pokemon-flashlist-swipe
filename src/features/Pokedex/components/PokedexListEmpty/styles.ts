import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	content: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	contentWithMarginTop: {
		marginTop: 64,
	},
	contentWithPaddingHorizontal: {
		paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding,
	},
	message: {
		color: textColor.grey,
		fontFamily: sharedStyles.typography.primaryFont,
		fontSize: 16,
		textAlign: 'center',
	},
});

export default styles;
