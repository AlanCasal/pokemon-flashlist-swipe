import { customColor, textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	backdropFill: {
		bottom: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
	},
	backdropOverlay: {
		backgroundColor: `rgba(23, 23, 27, ${sharedStyles.pokedex.sortSheet.backdropOpacity})`,
	},
	background: {
		backgroundColor: textColor.primary,
		borderTopLeftRadius: sharedStyles.pokedex.sortSheet.cornerRadius,
		borderTopRightRadius: sharedStyles.pokedex.sortSheet.cornerRadius,
	},
	contentContainer: {
		paddingBottom: 28,
		paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding,
		paddingTop: 6,
		rowGap: 12,
	},
	description: {
		color: textColor.grey,
		fontFamily: sharedStyles.typography.primaryFont,
		fontSize: sharedStyles.pokedex.sortText.descriptionFontSize,
		lineHeight: 20,
	},
	handleIndicator: {
		backgroundColor: textColor.primary,
		height: sharedStyles.pokedex.sortSheet.handleHeight,
		width: sharedStyles.pokedex.sortSheet.handleWidth,
	},
	optionButton: {
		alignItems: 'center',
		borderRadius: sharedStyles.pokedex.sortOption.borderRadius,
		height: sharedStyles.pokedex.sortOption.height,
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	optionButtonSelected: {
		backgroundColor: typeColors.dragon,
	},
	optionButtonUnselected: {
		backgroundColor: customColor.input,
	},
	optionLabel: {
		fontSize: sharedStyles.pokedex.sortOption.fontSize,
		textAlign: 'center',
		width: '100%',
	},
	optionLabelSelected: {
		color: textColor.primary,
	},
	optionLabelUnselected: {
		color: textColor.grey,
	},
	optionsContainer: {
		rowGap: 10,
	},
	title: {
		color: textColor.black,
		fontSize: sharedStyles.pokedex.sortText.titleFontSize,
		fontWeight: '700',
		textAlign: 'center',
	},
});

export default styles;
