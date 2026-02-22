import { textColor, typeColors } from '@constants/colors';
import { StyleSheet } from 'react-native';

type UseStylesProps = {
	minLevel: number | null;
	type: keyof typeof typeColors;
};

export const useStyles = ({ minLevel, type }: UseStylesProps) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			alignSelf: 'center',
			columnGap: 6,
			flexDirection: 'row',
			marginVertical: 8,
		},
		levelLabel: {
			backgroundColor: minLevel ? typeColors[type] : 'transparent',
			borderRadius: 5,
			fontSize: 12,
			fontWeight: '700',
			paddingHorizontal: 8,
			paddingVertical: 5,
			textAlign: 'center',
			width: 88,
		},
		message: {
			color: textColor.grey,
			fontSize: 11,
			textAlign: 'center',
			width: 78,
		},
	});
