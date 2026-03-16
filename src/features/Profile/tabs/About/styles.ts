import { textColor, typeColors } from '@constants/colors';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
	const { bottom } = useSafeAreaInsets();

	return StyleSheet.create({
		fallbackText: {
			color: textColor.grey,
			fontSize: 16,
			fontWeight: '500',
			lineHeight: 22,
			textAlign: 'center',
		},
		root: {
			paddingBottom: bottom + 32,
			paddingHorizontal: 40,
			paddingTop: 40,
		},
		row: {
			alignItems: 'center',
			columnGap: 10,
			flexDirection: 'row',
		},
		rowLabel: {
			color: textColor.dark,
			fontSize: 12,
			fontWeight: '500',
			lineHeight: 16,
			width: 110,
		},
		rowValue: {
			color: textColor.grey,
			flex: 1,
			fontSize: 16,
			fontWeight: '400',
			lineHeight: 22,
		},
		section: {
			rowGap: 20,
		},
		sectionList: {
			rowGap: 20,
		},
		sectionRows: {
			rowGap: 15,
		},
		sectionTitle: {
			color: typeColors.dragon,
			fontSize: 16,
			fontWeight: '700',
			lineHeight: 20,
		},
	});
};
