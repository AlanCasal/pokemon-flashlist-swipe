import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const {
	typography: { primaryFont },
} = sharedStyles;

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-end',
		flex: 1,
	},
	id: {
		color: textColor.number,
		fontSize: 10,
	},
	name: {
		color: textColor.primary,
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
	typeChip: {
		alignItems: 'center',
		borderRadius: 3,
		columnGap: 5,
		flexDirection: 'row',
		paddingHorizontal: 6,
		paddingVertical: 4,
	},
	typeLabel: {
		color: 'white',
		fontSize: 8,
		fontWeight: '700',
		textTransform: 'uppercase',
	},
	typesRow: {
		columnGap: 5,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
});

export default styles;
