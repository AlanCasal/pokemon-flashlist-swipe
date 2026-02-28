// @ts-nocheck
import { API_URL, GENERATION_URL } from '@constants/api';
import { fetchJson } from '@utils/helpers';

import { PokemonGenerationSpecies } from '@/src/types/pokemonGeneration';

import {
	buildGenerationSpeciesNameSet,
	fetchPokemonGenerationByNumber,
	getGenerationNumberFromOption,
	getPokemonGenerationQueryKey,
	getPokemonSpeciesIdFromUrl,
	mapGenerationSpeciesToPokemonList,
	sortGenerationSpeciesById,
} from './usePokemonGeneration';

jest.mock('@utils/helpers', () => ({
	...jest.requireActual('@utils/helpers'),
	fetchJson: jest.fn(),
}));

describe('usePokemonGeneration helpers', () => {
	it('maps generation option ids to generation numbers', () => {
		expect(getGenerationNumberFromOption('generation_1')).toBe(1);
		expect(getGenerationNumberFromOption('generation_8')).toBe(8);
		expect(getGenerationNumberFromOption(null)).toBeNull();
	});

	it('builds generation query key with selected generation number', () => {
		expect(getPokemonGenerationQueryKey(3)).toEqual(['pokemonGeneration', 3]);
		expect(getPokemonGenerationQueryKey(null)).toEqual(['pokemonGeneration', null]);
	});

	it('extracts species ids from pokemon-species urls', () => {
		expect(getPokemonSpeciesIdFromUrl('https://pokeapi.co/api/v2/pokemon-species/152/')).toBe(152);
		expect(getPokemonSpeciesIdFromUrl('https://pokeapi.co/api/v2/pokemon-species/chikorita')).toBe(
			null,
		);
	});

	it('sorts generation species by species id before fallback alphabetical sorting', () => {
		const speciesList: PokemonGenerationSpecies[] = [
			{ name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon-species/6/' },
			{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
			{ name: 'unknown-a', url: 'https://pokeapi.co/api/v2/pokemon-species/unknown-a/' },
			{ name: 'unknown-b', url: 'https://pokeapi.co/api/v2/pokemon-species/unknown-b/' },
		];

		expect(sortGenerationSpeciesById(speciesList).map(species => species.name)).toEqual([
			'bulbasaur',
			'charizard',
			'unknown-a',
			'unknown-b',
		]);
	});

	it('maps species entries into pokemon list entries using pokemon endpoint urls', () => {
		const speciesList: PokemonGenerationSpecies[] = [
			{ name: 'chikorita', url: 'https://pokeapi.co/api/v2/pokemon-species/152/' },
			{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
		];

		expect(mapGenerationSpeciesToPokemonList(speciesList)).toEqual([
			{ name: 'bulbasaur', url: `${API_URL}/bulbasaur` },
			{ name: 'chikorita', url: `${API_URL}/chikorita` },
		]);
	});

	it('builds a normalized lowercase species name set', () => {
		const speciesList: PokemonGenerationSpecies[] = [
			{ name: ' Chikorita ', url: 'https://pokeapi.co/api/v2/pokemon-species/152/' },
			{ name: 'TOTODILE', url: 'https://pokeapi.co/api/v2/pokemon-species/158/' },
		];

		expect(Array.from(buildGenerationSpeciesNameSet(speciesList))).toEqual([
			'chikorita',
			'totodile',
		]);
	});

	it('fetches generation data from the generation endpoint', async () => {
		(fetchJson as jest.Mock).mockResolvedValue({ id: 2, name: 'generation-ii' });

		await fetchPokemonGenerationByNumber(2);

		expect(fetchJson).toHaveBeenCalledWith(`${GENERATION_URL}/2`);
	});
});
