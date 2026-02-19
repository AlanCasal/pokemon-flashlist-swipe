import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	image: {
		bottom: 10,
		height: sharedStyles.dimensions.pokeImageSize,
		width: sharedStyles.dimensions.pokeImageSize,
		zIndex: 1,
	},
	pokeballContainer: {
		left: 10,
		position: 'absolute',
		top: 16,
	},
});

export default styles;
