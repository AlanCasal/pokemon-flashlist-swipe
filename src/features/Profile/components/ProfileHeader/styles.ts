import { textColor } from '@constants/colors';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
	const { top } = useSafeAreaInsets();

	return StyleSheet.create({
		avatarFallback: {
			alignItems: 'center',
			backgroundColor: 'rgba(255, 255, 255, 0.18)',
			borderRadius: 62,
			height: 125,
			justifyContent: 'center',
			width: 125,
		},
		avatarImage: {
			borderColor: 'rgba(255, 255, 255, 0.8)',
			borderRadius: 62,
			borderWidth: 3,
			height: 125,
			width: 125,
		},
		compactTitle: {
			color: textColor.light,
			fontSize: 25,
			fontWeight: '700',
			position: 'absolute',
			textAlign: 'center',
			top: top + 12,
			width: '100%',
			zIndex: 24,
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
		},
		heroSecondary: {
			color: textColor.dark2,
			fontSize: 16,
			fontWeight: '700',
			marginTop: 4,
		},
		heroTextBlock: {
			left: 190,
			position: 'absolute',
			right: 20,
			top: 82,
		},
	});
};
