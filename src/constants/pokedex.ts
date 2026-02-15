import { PokedexSortOption } from '@/src/types';

export const FILTERS_BAR_HEIGHT = 56;
export const SORT_SHEET_BACKDROP_OPACITY = 0.5;
export const SORT_SHEET_BLUR_INTENSITY = 18;
export const SORT_SHEET_CORNER_RADIUS = 30;
export const SORT_SHEET_HANDLE_WIDTH = 80;
export const SORT_SHEET_HANDLE_HEIGHT = 6;
export const SORT_SHEET_SNAP_POINT = '58%';

export const SORT_OPTION_HEIGHT = 40;
export const SORT_OPTION_BORDER_RADIUS = 12;

export const SORT_BADGE_SIZE = 14;
export const SORT_BADGE_FONT_SIZE = 10;
export const SORT_ACTIVE_BADGE_TEXT = '1';
export const SORT_DISABLED_OPACITY = 0.35;

export const SORT_TITLE_FONT_SIZE = 28;
export const SORT_DESCRIPTION_FONT_SIZE = 14;
export const SORT_OPTION_FONT_SIZE = 16;

export const POKEMON_ID_FROM_URL_REGEX = /\/pokemon\/(\d+)\/?$/;

export const POKEDEX_SORT_OPTIONS: { id: PokedexSortOption; label: string; testID: string }[] = [
	{
		id: 'number_asc',
		label: 'Smallest number first',
		testID: 'pokedex-sort-option-number-asc',
	},
	{
		id: 'number_desc',
		label: 'Highest number first',
		testID: 'pokedex-sort-option-number-desc',
	},
	{
		id: 'alpha_asc',
		label: 'A-Z',
		testID: 'pokedex-sort-option-alpha-asc',
	},
	{
		id: 'alpha_desc',
		label: 'Z-A',
		testID: 'pokedex-sort-option-alpha-desc',
	},
];
