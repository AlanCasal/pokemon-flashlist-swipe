import { textColor } from '@/src/constants/colors';
import { StyleSheet } from 'react-native';
import { PRIMARY_FONT } from '@/src/constants/sharedStyles';

export default StyleSheet.create({
	infoContainer: {
		flex: 1,
		alignItems: 'flex-end',
		gap: 5,
	},
	nameContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	name: {
		fontFamily: PRIMARY_FONT,
		color: textColor.primary,
		fontSize: 24,
		textTransform: 'capitalize',
	},
	starIcon: {
		bottom: 10,
		left: 5,
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
