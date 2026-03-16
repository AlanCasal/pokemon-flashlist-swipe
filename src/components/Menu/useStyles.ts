import { customColor, textColor, typeBgColors, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { usePrimaryFontFamily } from '@hooks/usePrimaryFontFamily';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {
	overlay: { backdropFill },
	spacing: { screenHorizontalPadding },
	sheetButtons: {
		option: { borderRadius, height, paddingHorizontal },
	},
} = sharedStyles;

export const useStyles = () => {
	const { bottom } = useSafeAreaInsets();
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
		fabButton: {
			alignItems: 'center',
			backgroundColor: typeBgColors.ghost,
			borderRadius: 28,
			height: 56,
			justifyContent: 'center',
			width: 56,
		},
		fabContainer: {
			bottom: bottom + 10,
			left: screenHorizontalPadding,
			position: 'absolute',
			zIndex: 9999,
		},
		headerLeftButton: {
			alignItems: 'flex-start',
			minWidth: 72,
			paddingVertical: 8,
		},
		headerRightButton: {
			alignItems: 'flex-end',
			minWidth: 72,
			paddingRight: 15,
		},
		headerRow: {
			alignItems: 'center',
			flexDirection: 'row',
			justifyContent: 'space-between',
			minHeight: 40,
		},
		headerSpacer: {
			minWidth: 72,
		},
		menuButton: {
			alignItems: 'center',
			backgroundColor: customColor.input,
			borderRadius: borderRadius,
			flexDirection: 'row',
			height: height,
			justifyContent: 'space-between',
			paddingHorizontal: paddingHorizontal,
		},
		menuButtonContent: {
			alignItems: 'center',
			columnGap: 8,
			flexDirection: 'row',
		},
		menuButtonLabel: {
			color: textColor.dark,
			fontSize: 16,
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
			flex: 1,
			fontFamily: primaryFont,
			fontSize: 28,
			fontWeight: '700',
			textAlign: 'center',
		},
	});
};
