import sharedStyles from '@/src/constants/sharedStyles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 4,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
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
