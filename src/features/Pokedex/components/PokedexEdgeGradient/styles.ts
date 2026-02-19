import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		height: 190,
		left: 0,
		position: 'absolute',
		right: 0,
		width: '100%',
		zIndex: sharedStyles.zIndex.headerGradient,
	},
	gradientFill: {
		bottom: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
	},
	positionBottom: {
		bottom: 0,
	},
	positionTop: {
		top: 0,
	},
});

export default styles;
