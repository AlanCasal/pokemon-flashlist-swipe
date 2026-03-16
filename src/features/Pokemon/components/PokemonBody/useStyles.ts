import { backgroundColors, textColor } from '@constants/colors';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
	const { top } = useSafeAreaInsets();

	return StyleSheet.create({
		movingTopLayer: {
			bottom: 0,
			elevation: 30,
			left: 0,
			position: 'absolute',
			right: 0,
			top: 0,
			zIndex: 30,
		},
		sheetBackground: {
			backgroundColor: backgroundColors.light,
			borderTopLeftRadius: 30,
			borderTopRightRadius: 30,
		},
		sheetContainer: {
			elevation: 20,
			zIndex: 20,
		},
		sheetContentContainer: {
			flexGrow: 1,
		},
		tabLabel: {
			color: textColor.light,
			fontSize: 16,
			textAlign: 'center',
		},
		tabLabelFocused: {
			fontWeight: '700',
			opacity: 1,
		},
		tabLabelIdle: {
			fontWeight: '400',
			opacity: 0.5,
		},
		tabPressable: {
			flex: 1,
			paddingVertical: 10,
		},
		tabsRow: {
			alignItems: 'center',
			flexDirection: 'row',
			left: 0,
			paddingHorizontal: 24,
			position: 'absolute',
			right: 0,
			top: top + 24,
		},
	});
};
