export const POKE_CARD_HEIGHT = 100;
export const POKE_IMAGE_SIZE = 120;
export const CARDS_GAP = 15;
export const ACTIVE_OPACITY = 0.8;
export const SVG_DEFAULT_OPACITY = 0.2;

export const PRIMARY_FONT = 'FingerPaint_400Regular';

export const TOAST_Z_INDEX = 9999;

const sharedStyles = {
	hListPadding: {
		paddingHorizontal: 40,
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

export default sharedStyles;
