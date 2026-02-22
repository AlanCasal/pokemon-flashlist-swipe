import {
	type PokedexGenerationOption,
	type PokedexHeightOption,
	type PokedexSortOption,
	type PokedexWeightOption,
} from '@/src/types';
import { type PokemonType } from '@/src/types/pokemonTypes';

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

export const POKEDEX_FILTER_TYPE_OPTIONS: {
	id: PokemonType;
	testID: string;
}[] = [
	{ id: 'bug', testID: 'pokedex-filter-type-bug' },
	{ id: 'dark', testID: 'pokedex-filter-type-dark' },
	{ id: 'dragon', testID: 'pokedex-filter-type-dragon' },
	{ id: 'electric', testID: 'pokedex-filter-type-electric' },
	{ id: 'fairy', testID: 'pokedex-filter-type-fairy' },
	{ id: 'fighting', testID: 'pokedex-filter-type-fighting' },
	{ id: 'fire', testID: 'pokedex-filter-type-fire' },
	{ id: 'flying', testID: 'pokedex-filter-type-flying' },
	{ id: 'ghost', testID: 'pokedex-filter-type-ghost' },
	{ id: 'grass', testID: 'pokedex-filter-type-grass' },
	{ id: 'ground', testID: 'pokedex-filter-type-ground' },
	{ id: 'ice', testID: 'pokedex-filter-type-ice' },
	{ id: 'normal', testID: 'pokedex-filter-type-normal' },
	{ id: 'poison', testID: 'pokedex-filter-type-poison' },
	{ id: 'psychic', testID: 'pokedex-filter-type-psychic' },
	{ id: 'rock', testID: 'pokedex-filter-type-rock' },
	{ id: 'steel', testID: 'pokedex-filter-type-steel' },
	{ id: 'water', testID: 'pokedex-filter-type-water' },
];

export const POKEDEX_FILTER_WEAKNESS_OPTIONS: {
	id: PokemonType;
	testID: string;
}[] = [
	{ id: 'bug', testID: 'pokedex-filter-weakness-bug' },
	{ id: 'dark', testID: 'pokedex-filter-weakness-dark' },
	{ id: 'dragon', testID: 'pokedex-filter-weakness-dragon' },
	{ id: 'electric', testID: 'pokedex-filter-weakness-electric' },
	{ id: 'fairy', testID: 'pokedex-filter-weakness-fairy' },
	{ id: 'fighting', testID: 'pokedex-filter-weakness-fighting' },
	{ id: 'fire', testID: 'pokedex-filter-weakness-fire' },
	{ id: 'flying', testID: 'pokedex-filter-weakness-flying' },
	{ id: 'ghost', testID: 'pokedex-filter-weakness-ghost' },
	{ id: 'grass', testID: 'pokedex-filter-weakness-grass' },
	{ id: 'ground', testID: 'pokedex-filter-weakness-ground' },
	{ id: 'ice', testID: 'pokedex-filter-weakness-ice' },
	{ id: 'normal', testID: 'pokedex-filter-weakness-normal' },
	{ id: 'poison', testID: 'pokedex-filter-weakness-poison' },
	{ id: 'psychic', testID: 'pokedex-filter-weakness-psychic' },
	{ id: 'rock', testID: 'pokedex-filter-weakness-rock' },
	{ id: 'steel', testID: 'pokedex-filter-weakness-steel' },
	{ id: 'water', testID: 'pokedex-filter-weakness-water' },
];

export const POKEDEX_FILTER_HEIGHT_OPTIONS: {
	id: PokedexHeightOption;
	label: string;
	testID: string;
	color: string;
}[] = [
	{
		id: 'short',
		label: 'Short',
		testID: 'pokedex-filter-height-short',
		color: '#FFC5E6',
	},
	{
		id: 'medium',
		label: 'Medium',
		testID: 'pokedex-filter-height-medium',
		color: '#AEBFD7',
	},
	{
		id: 'tall',
		label: 'Tall',
		testID: 'pokedex-filter-height-tall',
		color: '#AAACB8',
	},
];

export const POKEDEX_FILTER_WEIGHT_OPTIONS: {
	id: PokedexWeightOption;
	label: string;
	testID: string;
	color: string;
}[] = [
	{
		id: 'light',
		label: 'Light',
		testID: 'pokedex-filter-weight-light',
		color: '#99CD7C',
	},
	{
		id: 'normal',
		label: 'Normal',
		testID: 'pokedex-filter-weight-normal',
		color: '#57B2DC',
	},
	{
		id: 'heavy',
		label: 'Heavy',
		testID: 'pokedex-filter-weight-heavy',
		color: '#5A92A5',
	},
];

export const MIN_POKEMON_NUMBER = 1;
export const MAX_POKEMON_NUMBER = 1118;

export const POKEDEX_NUMBER_RANGE_DEFAULTS = {
	min: MIN_POKEMON_NUMBER,
	max: MAX_POKEMON_NUMBER,
} as const;
