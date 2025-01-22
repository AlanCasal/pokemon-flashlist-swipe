import sharedStyles from '@/src/constants/sharedStyles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	animatedContainer: {
		...StyleSheet.absoluteFillObject,
		overflow: 'hidden',
		borderRadius: 8,
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
