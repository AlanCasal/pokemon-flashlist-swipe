import { textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	badge: {
		alignItems: 'center',
		backgroundColor: typeColors.fighting,
		borderRadius: sharedStyles.pokedex.sortBadge.size / 2,
		height: sharedStyles.pokedex.sortBadge.size,
		justifyContent: 'center',
		position: 'absolute',
		right: -4,
		top: -4,
		width: sharedStyles.pokedex.sortBadge.size,
	},
	badgeLabel: {
		color: textColor.primary,
		fontFamily: sharedStyles.typography.primaryFont,
		fontSize: sharedStyles.pokedex.sortBadge.fontSize,
		lineHeight: sharedStyles.pokedex.sortBadge.size - 1,
		textAlign: 'center',
	},
});

export default styles;
