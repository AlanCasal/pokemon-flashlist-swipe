import { backdropOverlay, customColor, textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const {
	spacing: { screenHorizontalPadding },
	typography: { primaryFont },
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
		backgroundColor: textColor.primary,
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
		backgroundColor: textColor.primary,
		height: 6,
		width: 80,
	},
	optionButton: {
		alignItems: 'center',
		borderRadius: 12,
		height: 40,
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
		fontSize: 16,
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
		fontSize: 28,
		fontWeight: '700',
		textAlign: 'center',
	},
});

export default styles;
