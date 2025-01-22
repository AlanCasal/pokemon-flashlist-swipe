import { StyleSheet } from 'react-native';

const LEVEL_TEXT_WIDTH = 90;

export default StyleSheet.create({
	levelContainer: {
		alignSelf: 'center',
		flexDirection: 'row',
		gap: 10,
		marginVertical: 20,
		alignItems: 'center',
	},
	evolvesAtText: {
		fontSize: 12,
		width: LEVEL_TEXT_WIDTH,
		paddingLeft: 20,
		textAlign: 'center',
	},
	levelText: {
		fontSize: 10,
		width: LEVEL_TEXT_WIDTH,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		textAlign: 'center',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
	},
});
