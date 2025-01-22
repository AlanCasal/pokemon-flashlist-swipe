import sharedStyles from '@/src/constants/sharedStyles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
	},
	contentContainer: {
		// gap: CARDS_GAP, // doesn't work in FlashList
		...sharedStyles.hListPadding,
	},
});
