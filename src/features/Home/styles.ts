import { pokeballColors, textColor, typeBgColors, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type UseStylesProps = {
	itemSize: number;
};

type CreateSpriteTileStylesProps = {
	type: keyof typeof typeColors;
};

const {
	typography: { primaryFont },
} = sharedStyles;

export const createSpriteTileStyles = ({ type }: CreateSpriteTileStylesProps) => ({
	spriteTileBackground: {
		backgroundColor: typeBgColors[type],
	},
});

export const useStyles = ({ itemSize }: UseStylesProps) => {
	const { bottom } = useSafeAreaInsets();

	return StyleSheet.create({
		bottomGradient: {
			bottom: 0,
			height: '25%',
			left: 0,
			position: 'absolute',
			right: 0,
		},
		footer: {
			alignItems: 'center',
			backgroundColor: 'transparent',
			bottom: bottom + 20,
			rowGap: 8,
		},
		loadingContainer: {
			alignItems: 'center',
			flex: 1,
			justifyContent: 'center',
		},
		logo: {
			height: 80,
			width: 200,
		},
		marqueeAbsoluteFill: {
			bottom: 0,
			left: 0,
			position: 'absolute',
			right: 0,
			top: 0,
		},
		marqueeColumns: {
			flex: 1,
			rowGap: 8,
			transform: [{ rotate: '-4deg' }],
		},
		marqueeRow: {
			columnGap: 8,
			flexDirection: 'row',
		},
		marqueeRowHeight: {
			height: itemSize,
		},
		root: {
			backgroundColor: typeColors.dragon,
			flex: 1,
			overflow: 'hidden',
		},
		spriteImage: {
			aspectRatio: 1,
			width: itemSize,
			zIndex: 1,
		},
		spriteOverlay: {
			bottom: 0,
			left: 0,
			opacity: 0.5,
			padding: 10,
			position: 'absolute',
			right: 0,
			top: 0,
		},
		spriteTile: {
			borderRadius: 8,
			overflow: 'hidden',
			position: 'relative',
		},
		startButton: {
			alignItems: 'center',
			backgroundColor: pokeballColors.red,
			borderColor: pokeballColors.black,
			borderRadius: 999,
			borderWidth: 2,
			height: 48,
			justifyContent: 'center',
			width: 200,
		},
		startButtonLabel: {
			color: textColor.light,
			fontFamily: primaryFont,
			fontSize: 18,
		},
		startButtonWrapper: {
			marginTop: 16,
		},
		subtitle: {
			color: textColor.light,
			fontFamily: primaryFont,
			fontSize: 18,
			textAlign: 'center',
		},
		topGradient: {
			height: '25%',
			left: 0,
			position: 'absolute',
			right: 0,
			top: 0,
		},
	});
};
