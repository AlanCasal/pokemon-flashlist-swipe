import { pokeballColors, textColor, typeColors } from '@/src/constants/colors';
import { PRIMARY_FONT } from '@/src/constants/sharedStyles';
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
	marqueeImage: {
		width: ITEM_SIZE,
		aspectRatio: 1,
		backgroundColor: '#fafafa',
		borderRadius: SPACING,
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
