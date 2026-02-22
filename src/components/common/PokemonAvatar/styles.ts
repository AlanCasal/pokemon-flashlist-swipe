import { StyleSheet } from 'react-native';

const IMAGE_SIZE = 120;

const styles = StyleSheet.create({
	image: {
		bottom: 10,
		height: IMAGE_SIZE,
		width: IMAGE_SIZE,
		zIndex: 1,
	},
	pokeballContainer: {
		left: 10,
		position: 'absolute',
		top: 16,
	},
});

export default styles;
