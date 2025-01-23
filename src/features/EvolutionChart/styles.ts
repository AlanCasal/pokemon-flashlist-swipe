import { StyleSheet } from 'react-native';

const SAFE_PADDING = 30;

export default StyleSheet.create({
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
		paddingBottom: SAFE_PADDING,
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
	bottomTabContainer: {
		position: 'absolute',
		bottom: 0,
		alignSelf: 'center',
	},
});
