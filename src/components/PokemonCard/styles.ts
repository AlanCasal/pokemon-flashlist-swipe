import { customColor } from '@/src/constants/colors';
import { StyleSheet } from 'react-native';
import sharedStyles, {
	CARDS_GAP,
	POKEMON_CARD_HEIGHT,
} from '@/src/constants/sharedStyles';

export default StyleSheet.create({
	container: {
		height: POKEMON_CARD_HEIGHT,
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
});
