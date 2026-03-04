import { customColor, textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {
	overlay: { backdropFill },
	spacing: { screenHorizontalPadding },
} = sharedStyles;

export const useStyles = () => {
	const { bottom } = useSafeAreaInsets();

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
			backgroundColor: typeColors.dragon,
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
		handleIndicator: {
			backgroundColor: textColor.light,
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
};
