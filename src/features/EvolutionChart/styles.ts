import { PRIMARY_FONT } from '@/src/constants/sharedStyles';
import { StyleSheet } from 'react-native';

const LEVEL_TEXT_WIDTH = 80;
const SAFE_PADDING = 30;

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: SAFE_PADDING,
	},

	starIconContainer: {
		position: 'absolute',
		right: 20,
		top: 20,
		zIndex: 1,
	},

	titleWrapper: {
		position: 'absolute',
		left: 20,
		top: '50%',
		marginTop: SAFE_PADDING + 30,
		transformOrigin: 'left center',
		transform: [{ rotate: '270deg' }],
		width: 'auto',
	},
	title: {
		fontSize: 16,
		lineHeight: 20,
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},

	pokemonContainer: {
		alignItems: 'center',
	},

	pokemonImage: {
		width: 100,
		height: 100,
	},

	pokeball: {
		width: 100,
		height: 100,
	},

	pokemonName: {
		fontSize: 20,
		fontFamily: PRIMARY_FONT,
		textAlign: 'center',
		textTransform: 'capitalize',
	},

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

	bottomTabContainer: {
		position: 'absolute',
		bottom: 0,
		alignSelf: 'center',
	},
});
