import { PokedexGenerationOption, PokedexSortOption } from '@/src/types';

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

export const POKEDEX_GENERATION_OPTIONS: {
	id: PokedexGenerationOption;
	label: string;
	testID: string;
	generationNumber: number;
	starterIds: [number, number, number];
}[] = [
	{
		id: 'generation_1',
		label: 'Generation I',
		testID: 'pokedex-generation-option-1',
		generationNumber: 1,
		starterIds: [1, 4, 7],
	},
	{
		id: 'generation_2',
		label: 'Generation II',
		testID: 'pokedex-generation-option-2',
		generationNumber: 2,
		starterIds: [152, 155, 158],
	},
	{
		id: 'generation_3',
		label: 'Generation III',
		testID: 'pokedex-generation-option-3',
		generationNumber: 3,
		starterIds: [252, 255, 258],
	},
	{
		id: 'generation_4',
		label: 'Generation IV',
		testID: 'pokedex-generation-option-4',
		generationNumber: 4,
		starterIds: [387, 390, 393],
	},
	{
		id: 'generation_5',
		label: 'Generation V',
		testID: 'pokedex-generation-option-5',
		generationNumber: 5,
		starterIds: [495, 498, 501],
	},
	{
		id: 'generation_6',
		label: 'Generation VI',
		testID: 'pokedex-generation-option-6',
		generationNumber: 6,
		starterIds: [650, 653, 656],
	},
	{
		id: 'generation_7',
		label: 'Generation VII',
		testID: 'pokedex-generation-option-7',
		generationNumber: 7,
		starterIds: [722, 725, 728],
	},
	{
		id: 'generation_8',
		label: 'Generation VIII',
		testID: 'pokedex-generation-option-8',
		generationNumber: 8,
		starterIds: [810, 813, 816],
	},
];
