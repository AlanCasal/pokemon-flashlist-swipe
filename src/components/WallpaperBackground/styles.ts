import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

import { isIos } from '@/src/utils/helpers';

const IOS_BACKGROUND_BLUR_RADIUS = 20;
const ANDROID_BACKGROUND_BLUR_RADIUS = 10;

export const getBackgroundBlurRadius = () =>
	isIos ? IOS_BACKGROUND_BLUR_RADIUS : ANDROID_BACKGROUND_BLUR_RADIUS;

const styles = StyleSheet.create({
	image: {
		inset: 0,
		opacity: 0.1,
		position: 'absolute',
		zIndex: sharedStyles.zIndex.wallpaper,
	},
});

export default styles;
