import { PRIMARY_FONT } from '@/src/constants/sharedStyles';
import { StyleSheet } from 'react-native';
import { LEVEL_TEXT_WIDTH } from './Details';

const SAFE_PADDING = 30;

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: SAFE_PADDING,
	},

	sectionHeader: {
		fontSize: 20,
		position: 'absolute',
		transformOrigin: 'left center',
		transform: [{ rotate: '270deg' }],
		left: 20,
		top: '50%',
		marginTop: SAFE_PADDING + 5,
		textTransform: 'capitalize',
		width: 'auto',
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
		// fontFamily: PRIMARY_FONT,
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
