// @ts-nocheck
import { PokemonDetails } from '@/src/types/pokemon';
import { Pokemon } from '@/src/types/pokemonList';

import {
	getFilteredSavedPokemonList,
	getSearchedPokemonList,
	getShouldShowSearchNotFound,
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

	it('normalizes saved pokemon names from legacy URL values', () => {
		expect(normalizeSavedPokemonName('https://pokeapi.co/api/v2/pokemon/Dragonite/')).toBe(
			'dragonite',
		);
		expect(normalizeSavedPokemonName('  IVYSAUR  ')).toBe('ivysaur');
		expect(normalizeSavedPokemonName('')).toBe('');
	});
});
