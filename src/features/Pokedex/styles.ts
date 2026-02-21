import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

type UseStylesParams = {
	top: number;
	bottom: number;
	shouldShowSearchLoadingSpinner: boolean;
};

const POKEDEX_FILTERS_BAR_HEIGHT = 56;

export const useStyles = ({ top, bottom, shouldShowSearchLoadingSpinner }: UseStylesParams) =>
	StyleSheet.create({
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
		contentContainer: {
			paddingBottom: bottom + 80,
			paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding,
			paddingTop: shouldShowSearchLoadingSpinner ? 0 : top + POKEDEX_FILTERS_BAR_HEIGHT,
			...(shouldShowSearchLoadingSpinner ? { flexGrow: 1, justifyContent: 'center' } : {}),
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
