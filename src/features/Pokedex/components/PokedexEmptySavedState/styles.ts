import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
		fontFamily: sharedStyles.typography.primaryFont,
		fontSize: 16,
		textAlign: 'center',
	},
	textWithTopSpacing: {
		marginTop: 4,
	},
});

export default styles;
