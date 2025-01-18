import { customColor, textColor } from '@/src/constants/colors';
import { StyleSheet } from 'react-native';
import sharedStyles, {
	CARDS_GAP,
	POKEMON_CARD_HEIGHT,
	PRIMARY_FONT,
} from '@/src/constants/sharedStyles';

export default StyleSheet.create({
	container: {
		height: POKEMON_CARD_HEIGHT,
		backgroundColor: customColor.input,
		...sharedStyles.roundBorders,
		paddingLeft: 5,
		paddingRight: 14,
		marginVertical: CARDS_GAP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',

		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.6,
		shadowRadius: 4.65,

		elevation: 7,
	},
	image: {
		...sharedStyles.cardImageSize,
		bottom: 10,
		zIndex: 1,
	},
	pokeballContainer: {
		position: 'absolute',
		top: 10,
		left: -5,
	},
	infoContainer: {
		flex: 1,
		alignItems: 'flex-end',
		gap: 5,
	},
	name: {
		fontFamily: PRIMARY_FONT,
		color: textColor.primary,
		fontSize: 24,
		lineHeight: 28,
		textTransform: 'capitalize',
	},
	typesContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 10,
	},
	typeContainer: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	typeText: {
		fontSize: 9,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: textColor.primary,
	},
	pokemonId: {
		fontSize: 12,
		color: textColor.number,
	},
});
