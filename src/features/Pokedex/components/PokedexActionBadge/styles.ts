import { textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const {
	typography: { primaryFont },
} = sharedStyles;

const styles = StyleSheet.create({
	badge: {
		alignItems: 'center',
		backgroundColor: typeColors.fighting,
		borderRadius: 7,
		height: 14,
		justifyContent: 'center',
		position: 'absolute',
		right: -4,
		top: -4,
		width: 14,
	},
	badgeLabel: {
		color: textColor.primary,
		fontFamily: primaryFont,
		fontSize: 10,
		lineHeight: 13,
		textAlign: 'center',
	},
});

export default styles;
