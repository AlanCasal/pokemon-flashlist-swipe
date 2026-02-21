import { typeBgColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

type UseStylesProps = {
	type: keyof typeof typeBgColors;
};

const {
	dimensions: { pokeCardHeight },
	shadow,
} = sharedStyles;

export const useStyles = ({ type }: UseStylesProps) => {
	return StyleSheet.create({
		cardContainer: {
			alignItems: 'center',
			backgroundColor: typeBgColors[type],
			borderRadius: 10,
			flexDirection: 'row',
			height: pokeCardHeight,
			justifyContent: 'space-between',
			marginVertical: 15,
			paddingLeft: 5,
			paddingRight: 14,
			shadowColor: typeBgColors[type],
			...shadow,
		},
		loadingPlaceholder: {
			height: pokeCardHeight,
			marginVertical: 15,
		},
		pokeballDecoration: {
			alignItems: 'center',
			bottom: 12,
			justifyContent: 'center',
			left: '35%',
			position: 'absolute',
			transform: [{ rotate: '-90deg' }],
		},
	});
};
