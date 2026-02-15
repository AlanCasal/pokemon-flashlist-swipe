import { PokedexSortOption } from '@/src/types';

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
