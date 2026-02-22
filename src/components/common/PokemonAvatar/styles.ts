import { StyleSheet } from 'react-native';

const IMAGE_SIZE = 120;

type UseStylesProps = {
	centerImage: boolean;
	pokeballSize: number;
};

export const useStyles = ({ centerImage, pokeballSize }: UseStylesProps) => {
	return StyleSheet.create({
		container: {
			position: 'relative',
		},
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
			...(centerImage && {
				left: '50%',
				top: '50%',
				transform: [{ translateX: -pokeballSize / 2 }, { translateY: -pokeballSize / 2 }],
			}),
		},
	});
};
