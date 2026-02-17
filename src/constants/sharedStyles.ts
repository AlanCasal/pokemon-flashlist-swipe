export const sharedStyles = {
	dimensions: {
		pokeCardHeight: 100,
		pokeImageSize: 120,
		iconsSize: 20,
	},
	spacing: {
		cardsGap: 15,
		screenHorizontalPadding: 20,
		scrollToTopThreshold: 20,
		listVerticalPadding: 14,
	},
	opacity: {
		active: 0.8,
		svgDefault: 0.2,
	},
	duration: {
		fade: 300,
	},
	typography: {
		primaryFont: 'FingerPaint_400Regular',
	},
	zIndex: {
		wallpaper: 0,
		cards: 10,
		headerGradient: 15,
		header: 20,
		toast: 9999,
	},
	blurRadius: {
		backgroundImage: {
			android: 10,
			ios: 20,
		},
	},
	pokedex: {
		filtersBarHeight: 56,
		sortSheet: {
			backdropOpacity: 0.5,
			blurIntensity: 18,
			cornerRadius: 30,
			handleWidth: 80,
			handleHeight: 6,
			snapPoint: '58%',
		},
		sortOption: {
			height: 40,
			borderRadius: 12,
			fontSize: 16,
		},
		sortBadge: {
			size: 14,
			fontSize: 10,
			activeText: '1',
			disabledOpacity: 0.35,
		},
		searchLoadingSpinner: {
			size: 72,
			rotationDurationMs: 900,
		},
		sortText: {
			titleFontSize: 28,
			descriptionFontSize: 14,
		},
	},
	hListPadding: {
		paddingHorizontal: 20,
	},
	vListPadding: {
		paddingVertical: 14,
	},
	roundBorders: {
		borderRadius: 10,
	},
	cardImageSize: {
		width: 120,
		height: 120,
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
