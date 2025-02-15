import { pokeballColors, textColor, typeColors } from '@constants/colors';
import { PRIMARY_FONT } from '@constants/sharedStyles';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const ITEM_SIZE = width * 0.45;
export const SPACING = 8;

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: typeColors.dragon,
		overflow: 'hidden',
	},
	headerContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	marqueesContainer: {
		flex: 1,
		gap: SPACING,
		transform: [{ rotate: '-4deg' }],
	},
	spritesContainer: {
		flexDirection: 'row',
		gap: SPACING,
	},
	marqueeImageContainer: {
		borderRadius: SPACING,
		position: 'relative',
		overflow: 'hidden',
	},
	marqueeImage: {
		width: ITEM_SIZE,
		aspectRatio: 1,
		zIndex: 1,
	},
	pokeballContainer: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		opacity: 0.5,
		padding: 10,
	},
	gradient: {
		position: 'absolute',
		left: 0,
		right: 0,
		height: '25%',
	},
	bottomContainer: {
		flex: 0.5,
		alignItems: 'center',
		gap: SPACING,
	},
	logo: {
		width: 200,
		height: 80,
	},
	description: {
		fontFamily: PRIMARY_FONT,
		fontSize: 18,
		textAlign: 'center',
		color: textColor.primary,
	},
	button: {
		marginTop: SPACING * 2,
	},
	buttonContent: {
		height: 48,
		width: 200,
		borderRadius: 32,
		backgroundColor: pokeballColors.red,
		borderWidth: 2,
		borderColor: pokeballColors.black,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: textColor.primary,
		fontFamily: PRIMARY_FONT,
		fontSize: 18,
	},
});
