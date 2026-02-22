export const sharedStyles = {
	actionButton: {
		alignItems: 'center',
		borderRadius: 12,
		flex: 1,
		height: 40,
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	dimensions: {
		pokeCardHeight: 100,
	},
	spacing: {
		screenHorizontalPadding: 20,
	},
	opacity: {
		active: 0.8,
	},
	typography: {
		primaryFont: 'FingerPaint_400Regular',
	},
	sheetButtons: {
		option: {
			borderRadius: 12,
			height: 40,
			paddingHorizontal: 16,
		},
	},
	zIndex: {
		wallpaper: 0,
		cards: 10,
		headerGradient: 15,
		header: 20,
		toast: 9999,
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
} as const;
