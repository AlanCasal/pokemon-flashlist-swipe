import { backgroundColors, textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const {
	spacing: { screenHorizontalPadding },
	typography: { primaryFont },
} = sharedStyles;

const styles = StyleSheet.create({
	backdropFill: {
		backgroundColor: 'rgba(23, 23, 27, 0.5)',
		bottom: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
	},
	background: {
		backgroundColor: textColor.light,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	contentContainer: {
		paddingBottom: 24,
		paddingHorizontal: screenHorizontalPadding,
	},
	description: {
		color: textColor.grey,
		fontFamily: primaryFont,
		fontSize: 14,
		lineHeight: 20,
		marginTop: 12,
	},
	handleIndicator: {
		backgroundColor: textColor.light,
		height: 6,
		width: 80,
	},
	inactiveOpacity: {
		opacity: 0.3,
	},
	optionCard: {
		alignItems: 'center',
		borderRadius: 16,
		height: 140,
		justifyContent: 'center',
		overflow: 'hidden',
		paddingBottom: 8,
		paddingHorizontal: 12,
		paddingTop: 12,
		position: 'relative',
		rowGap: 12,
		width: '48%',
	},
	optionCardSelected: {
		backgroundColor: typeColors.dragon,
	},
	optionCardUnselected: {
		backgroundColor: backgroundColors.inactive,
	},
	optionDotsDecoration: {
		left: -80,
		opacity: 0.15,
		position: 'absolute',
		top: -50,
	},
	optionLabel: {
		fontSize: 16,
		textAlign: 'center',
		width: '100%',
		zIndex: 1,
	},
	optionLabelSelected: {
		color: textColor.light,
	},
	optionLabelUnselected: {
		color: textColor.grey,
	},
	optionPokeballDecoration: {
		bottom: -35,
		opacity: 0.15,
		position: 'absolute',
		right: -8,
	},
	optionSprite: {
		height: 60,
		marginHorizontal: -4,
		width: 60,
		zIndex: 1,
	},
	optionSpriteRow: {
		flexDirection: 'row',
		zIndex: 1,
	},
	optionsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginTop: 16,
		rowGap: 12,
	},
	scrollView: {
		paddingTop: 6,
	},
	title: {
		color: textColor.dark,
		fontSize: 28,
		fontWeight: '700',
		textAlign: 'center',
	},
});

export default styles;
