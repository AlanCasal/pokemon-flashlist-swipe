import { PRIMARY_FONT } from '@/src/constants/sharedStyles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	pokeContainer: {
		alignItems: 'center',
	},
	textWrapper: {
		marginTop: 8,
	},
	pokeTrigger: {
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	pokeName: {
		fontFamily: PRIMARY_FONT,
		textAlign: 'center',
		textTransform: 'capitalize',
	},
});
