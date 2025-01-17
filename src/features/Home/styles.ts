import sharedStyles from '@/src/constants/sharedStyles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: 'white',
	},
	contentContainer: {
		gap: 10,
		...sharedStyles.hPadding,
	},
});
