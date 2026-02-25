import { textColor, typeColors } from '@constants/colors';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
	const { bottom } = useSafeAreaInsets();

	return StyleSheet.create({
		description: {
			color: textColor.grey,
			fontSize: 16,
			fontWeight: '400',
			lineHeight: 24,
		},
		fallbackText: {
			color: textColor.grey,
			fontSize: 16,
			fontWeight: '500',
			lineHeight: 22,
			textAlign: 'center',
		},
		genderFemale: {
			color: typeColors.flying,
		},
		genderMale: {
			color: typeColors.fairy,
		},
		genderSymbol: {
			fontWeight: '700',
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
			width: 85,
		},
		rowSecondaryValue: {
			color: textColor.grey,
			fontSize: 12,
			fontWeight: '500',
			lineHeight: 16,
		},
		rowValue: {
			color: textColor.grey,
			fontSize: 16,
			fontWeight: '400',
			lineHeight: 22,
			width: 239,
		},
		rowValueColumn: {
			rowGap: 5,
			width: 239,
		},
		section: {
			rowGap: 20,
		},
		sectionList: {
			marginTop: 40,
			rowGap: 20,
		},
		sectionRows: {
			rowGap: 15,
		},
		sectionTitle: {
			fontSize: 16,
			fontWeight: '700',
			lineHeight: 20,
		},
		weaknessBadges: {
			columnGap: 5,
			flexDirection: 'row',
			flexWrap: 'wrap',
			rowGap: 5,
		},
		weaknessChip: {
			paddingHorizontal: 5,
			paddingVertical: 5,
		},
		weaknessChipLabel: {
			color: textColor.light,
			fontSize: 12,
			fontWeight: '500',
			lineHeight: 16,
			textTransform: 'capitalize',
		},
	});
};
