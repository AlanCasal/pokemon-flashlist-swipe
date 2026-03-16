import { textColor } from '@constants/colors';
import { usePrimaryFontFamily } from '@hooks/usePrimaryFontFamily';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
	const primaryFont = usePrimaryFontFamily();

	return StyleSheet.create({
		container: {
			alignItems: 'flex-end',
			flex: 1,
		},
		id: {
			color: textColor.dark2,
			fontSize: 10,
		},
		name: {
			color: textColor.light,
			fontFamily: primaryFont,
			fontSize: 20,
			letterSpacing: 1,
			marginBottom: 5,
			textTransform: 'capitalize',
		},
		topRow: {
			alignItems: 'center',
			columnGap: 5,
			flexDirection: 'row',
		},
		typesRow: {
			columnGap: 5,
			flexDirection: 'row',
			justifyContent: 'flex-end',
		},
	});
};
