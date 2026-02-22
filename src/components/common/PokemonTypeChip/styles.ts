import { textColor } from '@constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		borderRadius: 3,
		columnGap: 5,
		flexDirection: 'row',
		paddingHorizontal: 6,
		paddingVertical: 4,
	},
	label: {
		color: textColor.primary,
		fontSize: 8,
		fontWeight: '700',
		textTransform: 'uppercase',
	},
});

export default styles;
