import { backdropOverlay, customColor, textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const {
	spacing: { screenHorizontalPadding },
	typography: { primaryFont },
	sheetButtons: {
		option: { borderRadius, height, paddingHorizontal },
	},
} = sharedStyles;

const styles = StyleSheet.create({
	backdropFill: {
		bottom: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
	},
	backdropOverlay: {
		backgroundColor: backdropOverlay,
	},
	background: {
		backgroundColor: textColor.light,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	contentContainer: {
		paddingBottom: 28,
		paddingHorizontal: screenHorizontalPadding,
		paddingTop: 6,
		rowGap: 12,
	},
	description: {
		color: textColor.grey,
		fontFamily: primaryFont,
		fontSize: 14,
		lineHeight: 20,
	},
	handleIndicator: {
		backgroundColor: textColor.light,
		height: 6,
		width: 80,
	},
	optionButton: {
		alignItems: 'center',
		borderRadius: borderRadius,
		height: height,
		justifyContent: 'center',
		paddingHorizontal: paddingHorizontal,
	},
	optionButtonSelected: {
		backgroundColor: typeColors.dragon,
	},
	optionButtonUnselected: {
		backgroundColor: customColor.input,
	},
	optionLabel: {
		fontSize: 16,
		textAlign: 'center',
		width: '100%',
	},
	optionLabelSelected: {
		color: textColor.light,
	},
	optionLabelUnselected: {
		color: textColor.grey,
	},
	optionsContainer: {
		rowGap: 10,
	},
	title: {
		color: textColor.dark,
		fontSize: 28,
		fontWeight: '700',
		textAlign: 'center',
	},
});

export default styles;
