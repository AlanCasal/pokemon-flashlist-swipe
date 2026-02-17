// @ts-nocheck
import { POKEDEX_GENERATION_OPTIONS } from '@constants/pokedex';

import { PokemonDetails } from '@/src/types/pokemon';
import { Pokemon } from '@/src/types/pokemonList';

import {
	getEmptySavedTextParts,
	getFilteredSavedPokemonList,
	getIsSearchNotFoundError,
	getNextSingleSelectOption,
	getPokemonNumberFromUrl,
	getSearchedPokemonList,
	getShouldShowSearchNotFound,
	getSortedPokemonList,
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

	it('clears generation selection when tapping same option again', () => {
		expect(getNextSingleSelectOption('generation_3', 'generation_3')).toBeNull();
	});

	it('switches generation selection when tapping a different option', () => {
		expect(getNextSingleSelectOption('generation_3', 'generation_5')).toBe('generation_5');
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
});
