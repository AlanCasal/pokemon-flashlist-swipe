import { customColor, textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { usePrimaryFontFamily } from '@hooks/usePrimaryFontFamily';
import { StyleSheet } from 'react-native';

const {
	overlay: { backdropFill },
	spacing: { screenHorizontalPadding },
} = sharedStyles;

export const useStyles = () => {
	const primaryFont = usePrimaryFontFamily();

	return StyleSheet.create({
		actionButtonApply: {
			backgroundColor: typeColors.dragon,
		},
		actionButtonApplyLabel: {
			color: textColor.light,
		},
		actionButtonLabel: {
			fontFamily: primaryFont,
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
		backdropFill,
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
			fontFamily: primaryFont,
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
			fontFamily: primaryFont,
			fontSize: 16,
			fontWeight: '700',
		},
		sheetSection: {
			rowGap: 10,
		},
		title: {
			color: textColor.dark,
			fontFamily: primaryFont,
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
};
