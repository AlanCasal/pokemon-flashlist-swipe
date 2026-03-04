import { textColor, typeColors } from '@constants/colors';
import { usePrimaryFontFamily } from '@hooks/usePrimaryFontFamily';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
	const primaryFont = usePrimaryFontFamily();

	return StyleSheet.create({
		badge: {
			alignItems: 'center',
			backgroundColor: typeColors.fighting,
			borderRadius: 8,
			height: 14,
			justifyContent: 'center',
			minWidth: 14,
			paddingHorizontal: 3,
			position: 'absolute',
			right: -4,
			top: -4,
		},
		badgeLabel: {
			color: textColor.light,
			fontFamily: primaryFont,
			fontSize: 10,
			lineHeight: 13,
			textAlign: 'center',
		},
	});
};
