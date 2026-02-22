import { customColor, textColor, typeBgColors, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const {
	typography: { primaryFont },
} = sharedStyles;

export const useStyles = ({ isRangeMaxedOut }: { isRangeMaxedOut: boolean }) => {
	const sliderColor = isRangeMaxedOut ? typeColors.rock : typeBgColors.dark;

	return useMemo(
		() =>
			StyleSheet.create({
				rangeThumb: {
					backgroundColor: textColor.primary,
					borderColor: sliderColor,
					borderRadius: 10,
					borderWidth: 4,
					height: 20,
					position: 'absolute',
					width: 20,
				},
				rangeTrackActive: {
					backgroundColor: sliderColor,
					borderRadius: 3,
					height: 6,
					position: 'absolute',
				},
				rangeTrackBackground: {
					backgroundColor: customColor.border,
					borderRadius: 3,
					height: 6,
					width: '100%',
				},
				rangeTrackContainer: {
					height: 22,
					justifyContent: 'center',
					position: 'relative',
				},
				rangeValue: {
					color: sliderColor,
					fontFamily: primaryFont,
					fontSize: 14,
					lineHeight: 20,
					position: 'absolute',
					top: 0,
				},
				rangeValuesRow: {
					height: 20,
					position: 'relative',
				},
				trackInsetContainer: {
					paddingHorizontal: 12,
				},
			}),
		[sliderColor],
	);
};
