import { typeColors } from '@constants/colors';
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
			columnGap: 10,
			flexDirection: 'row',
			marginVertical: 20,
		},
		levelLabel: {
			backgroundColor: minLevel ? typeColors[type] : 'transparent',
			borderRadius: 5,
			fontSize: 10,
			fontWeight: '700',
			paddingHorizontal: 10,
			paddingVertical: 5,
			textAlign: 'center',
			textTransform: 'uppercase',
			width: 90,
		},
		message: {
			fontSize: 12,
			paddingLeft: 20,
			textAlign: 'center',
			width: 90,
		},
	});
