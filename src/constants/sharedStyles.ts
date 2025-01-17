import { StyleSheet } from 'react-native';

export const POKEMON_CARD_HEIGHT = 150;
export const POKEMON_IMAGE_SIZE = 100;
export const CARDS_GAP = 10;

export default StyleSheet.create({
	hPadding: {
		paddingHorizontal: 14,
	},
	vPadding: {
		paddingVertical: 14,
	},
	roundBorders: {
		borderRadius: 10,
	},
	pokemonFontSize: {
		fontSize: 16,
		lineHeight: 16,
	},
	cardImageSize: {
		width: POKEMON_IMAGE_SIZE,
		height: POKEMON_IMAGE_SIZE,
	},
});
