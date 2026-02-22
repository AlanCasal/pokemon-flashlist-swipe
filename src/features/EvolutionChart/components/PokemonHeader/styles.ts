import { textColor } from '@constants/colors';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
	const { top } = useSafeAreaInsets();

	return StyleSheet.create({
		compactTitle: {
			color: textColor.light,
			fontSize: 40,
			fontWeight: '700',
			left: 24,
			position: 'absolute',
			right: 24,
			textAlign: 'center',
			top: top + 6,
			zIndex: 24,
		},
		heroAvatarImage: {
			bottom: 0,
			height: 125,
			width: 125,
		},
		heroContent: {
			left: 0,
			position: 'absolute',
			right: 0,
			top: top + 8,
			zIndex: 10,
		},
		heroImageSlot: {
			height: 125,
			left: 40,
			position: 'absolute',
			top: 47,
			width: 125,
		},
		heroLoadingFallback: {
			alignItems: 'center',
			height: 125,
			justifyContent: 'center',
			width: 125,
		},
		heroName: {
			color: textColor.light,
			fontSize: 38,
			fontWeight: '700',
			textTransform: 'capitalize',
		},
		heroNumber: {
			color: textColor.dark2,
			fontSize: 16,
			fontWeight: '700',
			marginBottom: 4,
		},
		heroTextBlock: {
			left: 190,
			position: 'absolute',
			right: 20,
			top: 64,
		},
		heroWatermarkBlurOverlay: {
			...StyleSheet.absoluteFillObject,
		},
		heroWatermarkBlurSource: {
			color: textColor.watermark,
			textShadowColor: 'rgba(255, 255, 255, 0.75)',
			textShadowOffset: {
				height: 0,
				width: 0,
			},
			textShadowRadius: 18,
		},
		heroWatermarkForeground: {
			color: textColor.watermark,
			left: 0,
			position: 'absolute',
			right: 0,
			top: 0,
		},
		heroWatermarkLayer: {
			left: 18,
			overflow: 'hidden',
			position: 'absolute',
			right: -140,
			top: 0,
		},
		heroWatermarkTextBase: {
			fontSize: 86,
			fontWeight: '700',
		},
		typeChip: {
			columnGap: 6,
			paddingHorizontal: 7,
			paddingVertical: 5,
		},
		typeChipRow: {
			columnGap: 8,
			flexDirection: 'row',
			flexWrap: 'wrap',
			marginTop: 10,
		},
		typeChipText: {
			fontSize: 12,
			textTransform: 'capitalize',
		},
	});
};
