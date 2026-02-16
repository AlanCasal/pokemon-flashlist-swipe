import { sharedStyles } from '@constants/sharedStyles';
import { Image } from 'expo-image';
import { type ComponentProps } from 'react';

import { isIos } from '@/src/utils/helpers';

type WallpaperBackgroundProps = {
	source: ComponentProps<typeof Image>['source'];
};

const WallpaperBackground = ({ source }: WallpaperBackgroundProps) => {
	return (
		<Image
			source={source}
			contentFit='cover'
			blurRadius={
				isIos
					? sharedStyles.blurRadius.backgroundImage.ios
					: sharedStyles.blurRadius.backgroundImage.android
			}
			pointerEvents='none'
			style={{
				position: 'absolute',
				inset: 0,
				opacity: 0.1,
				zIndex: sharedStyles.zIndex.wallpaper,
			}}
		/>
	);
};

export default WallpaperBackground;
