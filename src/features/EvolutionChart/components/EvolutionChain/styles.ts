import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	chainStep: {
		alignItems: 'center',
		gap: 12,
		width: '100%',
	},
	current: {
		fontSize: 12,
		fontWeight: '700',
		lineHeight: 16,
		textAlign: 'center',
		textTransform: 'capitalize',
	},
	edgeDot: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
	},
	edgeDotLeft: {
		left: -28,
		transform: [{ rotate: '90deg' }],
	},
	edgeDotRight: {
		right: -28,
		transform: [{ rotate: '-90deg' }],
	},
	edgeDotsContainer: {
		bottom: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 38,
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
	rootNodeSlot: {
		alignItems: 'center',
		position: 'relative',
		width: '100%',
	},
	row: {
		alignItems: 'center',
		columnGap: 18,
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	rowSlot: {
		position: 'relative',
		width: '100%',
	},
});

export default styles;
