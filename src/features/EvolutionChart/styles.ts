import { StyleSheet } from 'react-native';

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
	bottomTabContainer: {
		position: 'absolute',
		bottom: 0,
		alignSelf: 'center',
	},
});
