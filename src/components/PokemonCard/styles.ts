import { customColor } from '@/src/constants/colors';
import { StyleSheet } from 'react-native';
import sharedStyles from '@/src/constants/sharedStyles';

export default StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: customColor.input,
		...sharedStyles.roundBorders,
		...sharedStyles.vPadding,
	},
	image: {
		width: 100,
		height: 100,
	},
});

