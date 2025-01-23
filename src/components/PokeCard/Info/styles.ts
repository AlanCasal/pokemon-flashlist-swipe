import { textColor } from '@/src/constants/colors';
import { StyleSheet } from 'react-native';
import { PRIMARY_FONT } from '@/src/constants/sharedStyles';

const SMALL_GAP = 5;

export default StyleSheet.create({
	infoContainer: {
		flex: 1,
		alignItems: 'flex-end',
	},
	firstRowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SMALL_GAP,
	},
	pokemonId: {
		fontSize: 10,
		color: textColor.number,
	},
	name: {
		fontFamily: PRIMARY_FONT,
		color: textColor.primary,
		letterSpacing: 1,
		fontSize: 20,
		textTransform: 'capitalize',
		marginBottom: SMALL_GAP,
	},
	thirdRowContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: SMALL_GAP,
	},
	typeContainer: {
		paddingHorizontal: 6,
		paddingVertical: 4,
		borderRadius: 3,
		flexDirection: 'row',
		alignItems: 'center',
		gap: SMALL_GAP,
	},
	typeText: {
		fontSize: 8,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: textColor.primary,
	},
});
