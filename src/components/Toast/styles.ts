import sharedStyles, { TOAST_Z_INDEX } from '@/src/constants/sharedStyles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		position: 'absolute',
		zIndex: TOAST_Z_INDEX,
		alignSelf: 'center',
		minHeight: 48,
		maxWidth: '90%',
		borderRadius: 25,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		...sharedStyles.shadow,
	},
	text: {
		color: '#fff',
		fontSize: 16,
		textTransform: 'capitalize',
	},
	iconContainer: {
		marginRight: 8,
	},
});
