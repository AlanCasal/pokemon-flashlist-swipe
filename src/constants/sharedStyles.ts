export const POKE_CARD_HEIGHT = 100;
export const POKE_IMAGE_SIZE = 120;
export const CARDS_GAP = 15;
export const ACTIVE_OPACITY = 0.8;
export const SVG_DEFAULT_OPACITY = 0.2;
export const FADE_DURATION = 300;
export const ICONS_SIZE = 20;

export const WALLPAPER_INDEX = 0;
export const CARDS_INDEX = 10;
export const HEADER_GRADIENT_INDEX = 15;
export const HEADER_INDEX = 20;

export const PRIMARY_FONT = 'FingerPaint_400Regular';

export const TOAST_Z_INDEX = 9999;
export const SCREEN_HORIZONTAL_PADDING = 20;
export const SCROLL_TO_TOP_THRESHOLD = 20;

export const sharedStyles = {
	hListPadding: {
		paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
	},
	vListPadding: {
		paddingVertical: 14,
	},
	roundBorders: {
		borderRadius: 10,
	},
	cardImageSize: {
		width: POKE_IMAGE_SIZE,
		height: POKE_IMAGE_SIZE,
	},
	shadow: {
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.6,
		shadowRadius: 4.65,

		elevation: 7,
	},
};
