import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type UseStylesParams = {
	shouldShowLoadingFeedback: boolean;
};

const POKEDEX_FILTERS_BAR_HEIGHT = 56;
const {
	spacing: { screenHorizontalPadding },
	zIndex: { cards, header, wallpaper },
} = sharedStyles;

export const useStyles = ({ shouldShowLoadingFeedback }: UseStylesParams) => {
	const { top, bottom } = useSafeAreaInsets();

	return StyleSheet.create({
		blurOverlay: {
			bottom: 0,
			left: 0,
			position: 'absolute',
			right: 0,
			top: 0,
			zIndex: header + 1,
		},
		container: {
			backgroundColor: shouldShowLoadingFeedback ? 'white' : 'transparent',
			flex: 1,
		},
		contentContainer: {
			paddingBottom: bottom + 80,
			paddingHorizontal: screenHorizontalPadding,
			paddingTop: shouldShowLoadingFeedback ? 0 : top + POKEDEX_FILTERS_BAR_HEIGHT,
			...(shouldShowLoadingFeedback ? { flexGrow: 1, justifyContent: 'center' } : {}),
		},
		flashList: {
			backgroundColor: shouldShowLoadingFeedback ? 'white' : 'transparent',
			flex: 1,
			zIndex: cards,
		},
		headerContainer: {
			left: 0,
			position: 'absolute',
			right: 0,
			top: 0,
			zIndex: header,
		},
		savedWallpaperOverlay: {
			backgroundColor: 'rgba(0, 0, 0, 0.2)',
			bottom: 0,
			left: 0,
			position: 'absolute',
			right: 0,
			top: 0,
			zIndex: wallpaper + 1,
		},
	});
};
