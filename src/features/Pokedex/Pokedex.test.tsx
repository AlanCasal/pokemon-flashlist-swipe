// @ts-nocheck
import { POKEDEX_GENERATION_OPTIONS } from '@constants/pokedex';

import { PokemonDetails } from '@/src/types/pokemon';
import { Pokemon } from '@/src/types/pokemonList';

import {
	getActiveSearchValues,
	getAppliedFilterCount,
	getDisplayedPokemonList,
	getDoesPokemonMatchAppliedFilters,
	getDoesPokemonMatchNumberRangeFromListItem,
	getEmptySavedTextParts,
	getEmptySavedToastConfig,
	getFilteredSavedPokemonList,
	getHeightOptionFromDecimeters,
	getIsNumberRangeChanged,
	getIsRangeMaxedOut,
	getIsSearchNotFoundError,
	getNextMultiSelectOptions,
	getNextSingleSelectOption,
	getPokemonNumberFromUrl,
	getSearchedPokemonList,
	getShouldDarkenBackgroundForEmptySavedState,
	getShouldFetchNextPage,
	getShouldShowSearchNotFound,
	getSortedPokemonList,
	getWeightOptionFromHectograms,
	normalizeSavedPokemonName,
} from './helpers';

describe('Pokedex search helpers', () => {
	it('maps searched pokemon into one card item', () => {
		const searchedPokemon = { name: 'ditto' } as PokemonDetails;

		expect(getSearchedPokemonList(searchedPokemon)).toEqual([
			{
				name: 'ditto',
				url: 'https://pokeapi.co/api/v2/pokemon/ditto',
			},
		]);
	});

	it('filters saved pokemons case-insensitively using normalized value', () => {
		const savedPokemonList: Pokemon[] = [
			{ name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/charmander' },
			{ name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/charizard' },
			{ name: 'ditto', url: 'https://pokeapi.co/api/v2/pokemon/ditto' },
		];

		expect(getFilteredSavedPokemonList(savedPokemonList, 'char')).toEqual([
			{ name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/charmander' },
			{ name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/charizard' },
		]);
	});

	it('returns not-found visibility when search is active and no results', () => {
		expect(
			getShouldShowSearchNotFound({
				isSearchActive: true,
				displayedPokemonCount: 0,
				isSavedMode: true,
				isSearchingPokemon: false,
				isSearchError: false,
				isSearchNotFoundError: false,
			}),
		).toBe(true);
	});

	it('does not show not-found while remote search is loading', () => {
		expect(
			getShouldShowSearchNotFound({
				isSearchActive: true,
				displayedPokemonCount: 0,
				isSavedMode: false,
				isSearchingPokemon: true,
				isSearchError: false,
				isSearchNotFoundError: false,
			}),
		).toBe(false);
	});

	it('treats 404 and 400 search errors as not found', () => {
		expect(getIsSearchNotFoundError(new Error('Request failed with status 404'))).toBe(true);
		expect(getIsSearchNotFoundError(new Error('Request failed with status 400'))).toBe(true);
	});

	it('does not treat other search errors as not found', () => {
		expect(getIsSearchNotFoundError(new Error('Request failed with status 500'))).toBe(false);
		expect(getIsSearchNotFoundError(new Error('Network request failed'))).toBe(false);
	});

	it('normalizes saved pokemon names from legacy URL values', () => {
		expect(normalizeSavedPokemonName('https://pokeapi.co/api/v2/pokemon/Dragonite/')).toBe(
			'dragonite',
		);
		expect(normalizeSavedPokemonName('  IVYSAUR  ')).toBe('ivysaur');
		expect(normalizeSavedPokemonName('')).toBe('');
	});

	it('extracts pokemon number from list url', () => {
		expect(getPokemonNumberFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25);
		expect(getPokemonNumberFromUrl('https://pokeapi.co/api/v2/pokemon/pikachu')).toBeNull();
	});

	it('sorts pokemon list alphabetically in descending order', () => {
		const pokemonList: Pokemon[] = [
			{ name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
			{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
			{ name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
		];

		expect(getSortedPokemonList(pokemonList, 'alpha_desc').map(pokemon => pokemon.name)).toEqual([
			'squirtle',
			'charmander',
			'bulbasaur',
		]);
	});

	it('sorts pokemon list by number ascending', () => {
		const pokemonList: Pokemon[] = [
			{ name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
			{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
			{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
		];

		expect(getSortedPokemonList(pokemonList, 'number_asc').map(pokemon => pokemon.name)).toEqual([
			'bulbasaur',
			'charizard',
			'pikachu',
		]);
	});

	it('parses empty saved text around pokeball placeholder', () => {
		const parsed = getEmptySavedTextParts('Catch your [pokeballIcon] favorites');

		expect(parsed.shouldRenderIcon).toBe(true);
		expect(parsed.iconPrefix).toBe('Catch your ');
		expect(parsed.iconSuffix).toBe(' favorites');
		expect(parsed.topLines).toEqual([]);
		expect(parsed.bottomLines).toEqual([]);
	});

	it('returns saved toast config when empty saved pokeball is active', () => {
		expect(getEmptySavedToastConfig(true)).toEqual({
			text: 'Pokémon saved !',
			isPokeballColored: true,
		});
	});

	it('returns removed toast config when empty saved pokeball is inactive', () => {
		expect(getEmptySavedToastConfig(false)).toEqual({
			text: 'Pokémon removed',
			isPokeballColored: false,
		});
	});

	it('clears generation selection when tapping same option again', () => {
		expect(getNextSingleSelectOption('generation_3', 'generation_3')).toBeNull();
	});

	it('switches generation selection when tapping a different option', () => {
		expect(getNextSingleSelectOption('generation_3', 'generation_5')).toBe('generation_5');
	});

	it('toggles multi-select options in and out of the selected set', () => {
		expect(getNextMultiSelectOptions(['fire', 'water'], 'fire')).toEqual(['water']);
		expect(getNextMultiSelectOptions(['fire', 'water'], 'dragon')).toEqual([
			'fire',
			'water',
			'dragon',
		]);
	});

	it('counts applied filters plus number range changes as one extra filter', () => {
		expect(
			getAppliedFilterCount({
				defaultRange: { min: 1, max: 1118 },
				filterState: {
					selectedTypes: ['fire', 'water'],
					selectedWeaknesses: ['dragon'],
					selectedHeights: ['medium'],
					selectedWeights: ['light', 'heavy'],
					numberRange: { min: 12, max: 1118 },
				},
			}),
		).toBe(7);
	});

	it('adds one filter when range is not maxed out', () => {
		expect(
			getAppliedFilterCount({
				defaultRange: { min: 1, max: 1118 },
				filterState: {
					selectedTypes: [],
					selectedWeaknesses: [],
					selectedHeights: [],
					selectedWeights: [],
					numberRange: { min: 2, max: 1118 },
				},
			}),
		).toBe(1);
	});

	it('treats default number range as unchanged', () => {
		expect(
			getIsNumberRangeChanged({
				defaultRange: { min: 1, max: 1118 },
				range: { min: 1, max: 1118 },
			}),
		).toBe(false);
		expect(
			getIsNumberRangeChanged({
				defaultRange: { min: 1, max: 1118 },
				range: { min: 2, max: 1118 },
			}),
		).toBe(true);
	});

	it('treats default number range as maxed out', () => {
		expect(
			getIsRangeMaxedOut({
				defaultRange: { min: 1, max: 1118 },
				range: { min: 1, max: 1118 },
			}),
		).toBe(true);
		expect(
			getIsRangeMaxedOut({
				defaultRange: { min: 1, max: 1118 },
				range: { min: 10, max: 1118 },
			}),
		).toBe(false);
	});

	it('contains 8 generation options with expected ids and labels', () => {
		expect(POKEDEX_GENERATION_OPTIONS).toHaveLength(8);
		expect(POKEDEX_GENERATION_OPTIONS.map(option => option.id)).toEqual([
			'generation_1',
			'generation_2',
			'generation_3',
			'generation_4',
			'generation_5',
			'generation_6',
			'generation_7',
			'generation_8',
		]);
		expect(POKEDEX_GENERATION_OPTIONS.map(option => option.label)).toEqual([
			'Generation I',
			'Generation II',
			'Generation III',
			'Generation IV',
			'Generation V',
			'Generation VI',
			'Generation VII',
			'Generation VIII',
		]);
		expect(POKEDEX_GENERATION_OPTIONS.map(option => option.starterIds)).toEqual([
			[1, 4, 7],
			[152, 155, 158],
			[252, 255, 258],
			[387, 390, 393],
			[495, 498, 501],
			[650, 653, 656],
			[722, 725, 728],
			[810, 813, 816],
		]);
	});

	it('maps height buckets at expected boundaries', () => {
		expect(getHeightOptionFromDecimeters(9)).toBe('short');
		expect(getHeightOptionFromDecimeters(10)).toBe('medium');
		expect(getHeightOptionFromDecimeters(20)).toBe('medium');
		expect(getHeightOptionFromDecimeters(21)).toBe('tall');
	});

	it('maps weight buckets at expected boundaries', () => {
		expect(getWeightOptionFromHectograms(99)).toBe('light');
		expect(getWeightOptionFromHectograms(100)).toBe('normal');
		expect(getWeightOptionFromHectograms(1000)).toBe('normal');
		expect(getWeightOptionFromHectograms(1001)).toBe('heavy');
	});

	it('matches list-item number range when url has numeric id', () => {
		expect(
			getDoesPokemonMatchNumberRangeFromListItem({
				pokemon: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
				range: { min: 20, max: 30 },
			}),
		).toBe(true);
		expect(
			getDoesPokemonMatchNumberRangeFromListItem({
				pokemon: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
				range: { min: 26, max: 30 },
			}),
		).toBe(false);
	});

	it('keeps list-item number range as unknown when url has no numeric id', () => {
		expect(
			getDoesPokemonMatchNumberRangeFromListItem({
				pokemon: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' },
				range: { min: 1, max: 10 },
			}),
		).toBe(true);
	});

	it('applies filters with OR semantics inside each category', () => {
		const pokemon = { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' };
		const pokemonDetails = {
			id: 6,
			height: 17,
			weight: 905,
			types: [{ type: { name: 'fire' } }, { type: { name: 'flying' } }],
		} as PokemonDetails;
		const damageRelationsByType = {
			fire: {
				damage_relations: {
					double_damage_from: [{ name: 'rock' }],
					half_damage_from: [],
					no_damage_from: [],
				},
			},
			flying: {
				damage_relations: {
					double_damage_from: [{ name: 'rock' }, { name: 'electric' }],
					half_damage_from: [],
					no_damage_from: [],
				},
			},
		};

		expect(
			getDoesPokemonMatchAppliedFilters({
				pokemon,
				pokemonDetails,
				damageRelationsByType,
				filterState: {
					numberRange: { min: 1, max: 100 },
					selectedTypes: ['water', 'fire'],
					selectedWeaknesses: ['water', 'rock'],
					selectedHeights: ['short', 'medium'],
					selectedWeights: ['light', 'normal'],
				},
			}),
		).toBe(true);
	});

	it('requires AND semantics across categories', () => {
		const pokemon = { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' };
		const pokemonDetails = {
			id: 6,
			height: 17,
			weight: 905,
			types: [{ type: { name: 'fire' } }, { type: { name: 'flying' } }],
		} as PokemonDetails;

		expect(
			getDoesPokemonMatchAppliedFilters({
				pokemon,
				pokemonDetails,
				damageRelationsByType: {},
				filterState: {
					numberRange: { min: 7, max: 100 },
					selectedTypes: ['water', 'fire'],
					selectedWeaknesses: [],
					selectedHeights: ['medium'],
					selectedWeights: ['normal'],
				},
			}),
		).toBe(false);
	});

	it('falls back to pokemon details id for number filtering', () => {
		const pokemon = { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' };
		const pokemonDetails = {
			id: 25,
			height: 4,
			weight: 60,
			types: [{ type: { name: 'electric' } }],
		} as PokemonDetails;

		expect(
			getDoesPokemonMatchAppliedFilters({
				pokemon,
				pokemonDetails,
				damageRelationsByType: {},
				filterState: {
					numberRange: { min: 20, max: 30 },
					selectedTypes: [],
					selectedWeaknesses: [],
					selectedHeights: [],
					selectedWeights: [],
				},
			}),
		).toBe(true);
		expect(
			getDoesPokemonMatchAppliedFilters({
				pokemon,
				pokemonDetails,
				damageRelationsByType: {},
				filterState: {
					numberRange: { min: 26, max: 30 },
					selectedTypes: [],
					selectedWeaknesses: [],
					selectedHeights: [],
					selectedWeights: [],
				},
			}),
		).toBe(false);
	});
});

describe('Pokedex controller helpers', () => {
	it('selects active search values for all mode', () => {
		expect(
			getActiveSearchValues({
				isSavedMode: false,
				allSearchValue: 'charm',
				savedSearchValue: 'ditto',
				debouncedAllSearchValue: 'charmander',
				debouncedSavedSearchValue: 'ditto',
			}),
		).toEqual({
			activeSearchValue: 'charm',
			activeDebouncedSearchValue: 'charmander',
		});
	});

	it('selects active search values for saved mode', () => {
		expect(
			getActiveSearchValues({
				isSavedMode: true,
				allSearchValue: 'charm',
				savedSearchValue: 'ditto',
				debouncedAllSearchValue: 'charmander',
				debouncedSavedSearchValue: 'ditto',
			}),
		).toEqual({
			activeSearchValue: 'ditto',
			activeDebouncedSearchValue: 'ditto',
		});
	});

	it('returns full pokemon list when search is inactive in all mode', () => {
		const pokemonList: Pokemon[] = [
			{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
		];

		expect(
			getDisplayedPokemonList({
				isSearchActive: false,
				isSavedMode: false,
				pokemonList,
				savedPokemonList: [{ name: 'ditto', url: 'https://pokeapi.co/api/v2/pokemon/ditto/' }],
				filteredSavedPokemonList: [],
				searchedPokemonList: [],
			}),
		).toEqual(pokemonList);
	});

	it('returns filtered saved list when search is active in saved mode', () => {
		const filteredSavedPokemonList: Pokemon[] = [
			{ name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/charmander/' },
		];

		expect(
			getDisplayedPokemonList({
				isSearchActive: true,
				isSavedMode: true,
				pokemonList: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }],
				savedPokemonList: [{ name: 'ditto', url: 'https://pokeapi.co/api/v2/pokemon/ditto/' }],
				filteredSavedPokemonList,
				searchedPokemonList: [{ name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' }],
			}),
		).toEqual(filteredSavedPokemonList);
	});

	it('returns searched list when search is active in all mode', () => {
		const searchedPokemonList: Pokemon[] = [
			{ name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
		];

		expect(
			getDisplayedPokemonList({
				isSearchActive: true,
				isSavedMode: false,
				pokemonList: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }],
				savedPokemonList: [{ name: 'ditto', url: 'https://pokeapi.co/api/v2/pokemon/ditto/' }],
				filteredSavedPokemonList: [],
				searchedPokemonList,
			}),
		).toEqual(searchedPokemonList);
	});

	it('fetches next page only when all pagination guards pass', () => {
		expect(
			getShouldFetchNextPage({
				isSavedMode: false,
				isSearchActive: false,
				hasNextPage: true,
				isFetchingNextPage: false,
			}),
		).toBe(true);

		expect(
			getShouldFetchNextPage({
				isSavedMode: true,
				isSearchActive: false,
				hasNextPage: true,
				isFetchingNextPage: false,
			}),
		).toBe(false);

		expect(
			getShouldFetchNextPage({
				isSavedMode: false,
				isSearchActive: true,
				hasNextPage: true,
				isFetchingNextPage: false,
			}),
		).toBe(false);

		expect(
			getShouldFetchNextPage({
				isSavedMode: false,
				isSearchActive: false,
				hasNextPage: false,
				isFetchingNextPage: false,
			}),
		).toBe(false);

		expect(
			getShouldFetchNextPage({
				isSavedMode: false,
				isSearchActive: false,
				hasNextPage: true,
				isFetchingNextPage: true,
			}),
		).toBe(false);
	});

	it('darkens saved background only when saved mode is empty and not searching', () => {
		expect(
			getShouldDarkenBackgroundForEmptySavedState({
				isSavedMode: true,
				isSearchActive: false,
				savedPokemonCount: 0,
			}),
		).toBe(true);

		expect(
			getShouldDarkenBackgroundForEmptySavedState({
				isSavedMode: true,
				isSearchActive: true,
				savedPokemonCount: 0,
			}),
		).toBe(false);

		expect(
			getShouldDarkenBackgroundForEmptySavedState({
				isSavedMode: true,
				isSearchActive: false,
				savedPokemonCount: 2,
			}),
		).toBe(false);

		expect(
			getShouldDarkenBackgroundForEmptySavedState({
				isSavedMode: false,
				isSearchActive: false,
				savedPokemonCount: 0,
			}),
		).toBe(false);
	});
});
