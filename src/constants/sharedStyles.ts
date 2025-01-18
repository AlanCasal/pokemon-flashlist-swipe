import { StyleSheet } from 'react-native';

export const POKEMON_CARD_HEIGHT = 100;
export const POKEMON_IMAGE_SIZE = 120;
export const CARDS_GAP = 15;
export const PRIMARY_FONT = 'FingerPaint_400Regular';

export default StyleSheet.create({
	hListPadding: {
		paddingHorizontal: 40,
	},
	vListPadding: {
		paddingVertical: 14,
	},
	roundBorders: {
		borderRadius: 10,
	},
	cardImageSize: {
		width: POKEMON_IMAGE_SIZE,
		height: POKEMON_IMAGE_SIZE,
	},
});
