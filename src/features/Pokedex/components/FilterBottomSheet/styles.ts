import { backdropOverlay, customColor, textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const {
	typography: { primaryFont },
	spacing: { screenHorizontalPadding },
} = sharedStyles;

const styles = StyleSheet.create({
	actionButtonApply: {
		backgroundColor: typeColors.dragon,
	},
	actionButtonApplyLabel: {
		color: textColor.light,
	},
	actionButtonLabel: {
		fontSize: 16,
	},
	actionButtonReset: {
		backgroundColor: typeColors.fighting,
	},
	actionButtonResetLabel: {
		color: textColor.light,
	},
	actionButtonsRow: {
		columnGap: 14,
		flexDirection: 'row',
		paddingBottom: 12,
	},
	backdropFill: {
		backgroundColor: backdropOverlay,
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
		paddingTop: 6,
		rowGap: 18,
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
	numberRangeContainer: {
		rowGap: 10,
	},
	numberRangeInput: {
		backgroundColor: customColor.input,
		borderRadius: 12,
		color: textColor.dark,
		flexShrink: 0,
		fontFamily: primaryFont,
		fontSize: 16,
		height: 44,
		paddingHorizontal: 10,
		textAlign: 'center',
		width: 72,
	},
	numberRangeInputsRow: {
		alignItems: 'center',
		columnGap: 10,
		flexDirection: 'row',
	},
	numberRangeMaxButton: {
		alignItems: 'center',
		backgroundColor: typeColors.rock,
		borderRadius: 12,
		flex: 1,
		height: 44,
		justifyContent: 'center',
		paddingHorizontal: 12,
	},
	numberRangeMaxButtonDisabled: {
		backgroundColor: customColor.input,
	},
	numberRangeMaxButtonLabel: {
		color: textColor.light,
		fontSize: 14,
	},
	numberRangeMaxButtonLabelDisabled: {
		color: textColor.grey,
	},
	optionButton: {
		alignItems: 'center',
		borderRadius: 25,
		height: 50,
		justifyContent: 'center',
		width: 50,
	},
	optionButtonUnselected: {
		backgroundColor: 'transparent',
	},
	optionGroupRow: {
		columnGap: 10,
		flexDirection: 'row',
	},
	sectionTitle: {
		color: textColor.dark,
		fontSize: 16,
		fontWeight: '700',
	},
	sheetSection: {
		rowGap: 10,
	},
	title: {
		color: textColor.dark,
		fontSize: 32,
		fontWeight: '700',
		textAlign: 'center',
	},
	typeOptionsContent: {
		columnGap: 10,
		marginBottom: 15,
		paddingRight: screenHorizontalPadding,
	},
});

export default styles;
