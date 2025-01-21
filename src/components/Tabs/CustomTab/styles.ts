import sharedStyles from '@/src/constants/sharedStyles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	animatedContainer: {
		overflow: 'hidden',
		...sharedStyles.shadow,
	},
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
		gap: 4,
	},
});
