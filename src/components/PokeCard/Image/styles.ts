import { StyleSheet } from 'react-native';
import sharedStyles from '@constants/sharedStyles';

export default StyleSheet.create({
	image: {
		...sharedStyles.cardImageSize,
		bottom: 10,
		zIndex: 1,
	},
	pokeballContainer: {
		position: 'absolute',
		top: 16,
		left: 10,
	},
});
