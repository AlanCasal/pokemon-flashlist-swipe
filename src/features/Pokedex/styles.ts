import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	blurOverlay: {
		bottom: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
		zIndex: sharedStyles.zIndex.header + 1,
	},
	container: {
		flex: 1,
	},
	flashList: {
		flex: 1,
		zIndex: sharedStyles.zIndex.cards,
	},
	headerContainer: {
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
		zIndex: sharedStyles.zIndex.header,
	},
	savedWallpaperOverlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		bottom: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
		zIndex: sharedStyles.zIndex.wallpaper + 1,
	},
});

export default styles;
