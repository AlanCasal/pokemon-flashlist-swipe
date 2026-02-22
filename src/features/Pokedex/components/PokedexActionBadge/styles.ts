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
		borderRadius: 8,
		height: 14,
		justifyContent: 'center',
		minWidth: 14,
		paddingHorizontal: 3,
		position: 'absolute',
		right: -4,
		top: -4,
	},
	badgeLabel: {
		color: textColor.light,
		fontFamily: primaryFont,
		fontSize: 10,
		lineHeight: 13,
		textAlign: 'center',
	},
});

export default styles;
