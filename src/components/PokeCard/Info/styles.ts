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

export default styles;
