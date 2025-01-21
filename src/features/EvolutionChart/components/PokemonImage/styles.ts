import { PRIMARY_FONT } from '@/src/constants/sharedStyles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	pokeName: {
		fontSize: 20,
		fontFamily: PRIMARY_FONT,
		textAlign: 'center',
		textTransform: 'capitalize',
	},
	pokeImage: {
		width: 100,
		height: 100,
	},
	pokeContainer: {
		alignItems: 'center',
	},
});
