import { Image } from 'expo-image';
import { type ComponentProps } from 'react';

import styles, { getBackgroundBlurRadius } from './styles';

type WallpaperBackgroundProps = {
	source: ComponentProps<typeof Image>['source'];
};

const WallpaperBackground = ({ source }: WallpaperBackgroundProps) => {
	return (
		<Image
			source={source}
			contentFit='cover'
			blurRadius={getBackgroundBlurRadius()}
			pointerEvents='none'
			style={styles.image}
		/>
	);
};

export default WallpaperBackground;
