import { customColor, textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { usePrimaryFontFamily } from '@hooks/usePrimaryFontFamily';
import { StyleSheet } from 'react-native';

const {
	overlay: { backdropFill },
	spacing: { screenHorizontalPadding },
	sheetButtons: {
		option: { borderRadius, height, paddingHorizontal },
	},
} = sharedStyles;

export const useStyles = () => {
	const primaryFont = usePrimaryFontFamily();

	return StyleSheet.create({
		backdropFill,
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
			fontFamily: primaryFont,
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
			fontFamily: primaryFont,
			fontSize: 28,
			fontWeight: '700',
			textAlign: 'center',
		},
	});
};
