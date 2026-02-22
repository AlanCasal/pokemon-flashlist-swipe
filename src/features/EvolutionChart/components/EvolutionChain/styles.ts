import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	chainStep: {
		alignItems: 'center',
		gap: 12,
	},
	multiEvolutionContainer: {
		gap: 14,
		width: '100%',
	},
	nodeImage: {
		bottom: 0,
	},
	nodeImageContainer: {
		alignItems: 'center',
	},
	nodeName: {
		fontWeight: '700',
		textAlign: 'center',
		textTransform: 'capitalize',
	},
	nodeTextContainer: {
		marginTop: 6,
	},
	nodeTrigger: {
		fontWeight: '700',
		marginBottom: 3,
		textAlign: 'center',
	},
	row: {
		alignItems: 'center',
		columnGap: 18,
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
});

export default styles;
