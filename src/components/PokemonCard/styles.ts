import { customColor } from '@/src/constants/colors';
import { StyleSheet } from 'react-native';
import sharedStyles, {
	POKEMON_CARD_HEIGHT,
} from '@/src/constants/sharedStyles';

export default StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		height: POKEMON_CARD_HEIGHT,
		backgroundColor: customColor.input,
		...sharedStyles.roundBorders,
		...sharedStyles.vPadding,
		marginVertical: 10,
	},
	image: {
		...sharedStyles.cardImageSize,
	},
	name: {
		...sharedStyles.pokemonFontSize,
		textTransform: 'capitalize',
	},
});
