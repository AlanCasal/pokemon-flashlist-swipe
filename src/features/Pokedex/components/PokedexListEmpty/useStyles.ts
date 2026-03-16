import { sharedStyles } from '@constants/sharedStyles';
import { usePrimaryFontFamily } from '@hooks/usePrimaryFontFamily';
import { StyleSheet } from 'react-native';

import { createEmptyStateTextStyle } from '../PokedexEmptySavedState/useStyles';

const {
	spacing: { screenHorizontalPadding },
} = sharedStyles;

export const useStyles = () => {
	const primaryFont = usePrimaryFontFamily();

	return StyleSheet.create({
		content: {
			alignItems: 'center',
			justifyContent: 'center',
		},
		contentWithMarginTop: {
			marginTop: 64,
		},
		contentWithPaddingHorizontal: {
			paddingHorizontal: screenHorizontalPadding,
		},
		message: createEmptyStateTextStyle(primaryFont),
	});
};
