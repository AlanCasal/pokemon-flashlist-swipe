import { customColor } from '@/src/constants/colors';
import { StyleSheet } from 'react-native';
import sharedStyles, {
	CARDS_GAP,
	POKE_CARD_HEIGHT,
} from '@/src/constants/sharedStyles';

export default StyleSheet.create({
	container: {
		height: POKE_CARD_HEIGHT,
		backgroundColor: customColor.input,
		paddingLeft: 5,
		paddingRight: 14,
		marginVertical: CARDS_GAP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',

		...sharedStyles.roundBorders,
		...sharedStyles.shadow,
	},
	dotsContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		left: '35%',
		bottom: 12,
		transform: [{ rotate: '-90deg' }],
	},
});
