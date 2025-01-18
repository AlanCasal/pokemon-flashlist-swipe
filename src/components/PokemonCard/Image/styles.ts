import { StyleSheet } from 'react-native';
import sharedStyles from '@/src/constants/sharedStyles';

export default StyleSheet.create({
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
});
