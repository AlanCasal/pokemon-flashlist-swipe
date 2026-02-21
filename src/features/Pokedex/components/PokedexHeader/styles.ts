import { customColor, textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {
	spacing: { screenHorizontalPadding },
	typography: { primaryFont },
} = sharedStyles;

export const useStyles = () => {
	const { top } = useSafeAreaInsets();

	return StyleSheet.create({
		actionButton: {
			alignItems: 'center',
			backgroundColor: customColor.input,
			borderColor: customColor.border,
			borderRadius: 12,
			borderWidth: 1,
			height: 32,
			justifyContent: 'center',
			width: 32,
		},
		actionButtonDisabled: {
			opacity: 0.35,
		},
		clearSearchButton: {
			marginLeft: 8,
		},
		container: {
			paddingBottom: 12,
			paddingHorizontal: screenHorizontalPadding,
			paddingTop: top,
		},
		controls: {
			alignItems: 'center',
			columnGap: 8,
			flexDirection: 'row',
		},
		searchInput: {
			color: textColor.black,
			flex: 1,
			fontFamily: primaryFont,
			fontSize: 13,
			marginLeft: 8,
			paddingBottom: 0,
			paddingTop: 0,
		},
		searchInputContainer: {
			alignItems: 'center',
			backgroundColor: customColor.input,
			borderColor: customColor.border,
			borderRadius: 12,
			borderWidth: 1,
			flex: 1,
			flexDirection: 'row',
			height: 36,
			paddingHorizontal: 12,
		},
	});
};
