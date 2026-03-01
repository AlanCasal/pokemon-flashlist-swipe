import { API_URL, GENERATION_URL } from '@constants/api';
import { POKEDEX_GENERATION_OPTIONS } from '@constants/pokedex';
import { useQuery } from '@tanstack/react-query';
import { fetchJson } from '@utils/helpers';

import { PokedexGenerationOption } from '@/src/types';
import { PokemonGenerationResponse, PokemonGenerationSpecies } from '@/src/types/pokemonGeneration';
import { Pokemon } from '@/src/types/pokemonList';

const POKEMON_GENERATION_QUERY_KEY = 'pokemonGeneration';
const POKEMON_SPECIES_ID_FROM_URL_REGEX = /\/pokemon-species\/(\d+)\/?$/i;
const POKEMON_GENERATION_STALE_TIME_MS = 600000; // 10 minutes
const POKEMON_GENERATION_GC_TIME_MS = 1800000; // 30 minutes

export interface PokemonGenerationData {
	generationId: number;
	generationName: string;
	pokemonList: Pokemon[];
	speciesNameSet: Set<string>;
}

export const getGenerationNumberFromOption = (
	selectedGenerationOption: PokedexGenerationOption | null,
) =>
	selectedGenerationOption
		? (POKEDEX_GENERATION_OPTIONS.find(option => option.id === selectedGenerationOption)
				?.generationNumber ?? null)
		: null;

export const getPokemonGenerationQueryKey = (generationNumber: number | null) =>
	[POKEMON_GENERATION_QUERY_KEY, generationNumber] as const;

export const getPokemonSpeciesIdFromUrl = (url: string): number | null => {
	const normalizedUrl = url.trim().toLowerCase();
	if (!normalizedUrl) return null;

	const matches = normalizedUrl.match(POKEMON_SPECIES_ID_FROM_URL_REGEX);
	if (!matches?.[1]) return null;

	const parsed = Number.parseInt(matches[1], 10);
	return Number.isNaN(parsed) ? null : parsed;
};

export const sortGenerationSpeciesById = (speciesList: PokemonGenerationSpecies[]) =>
	[...speciesList].sort((left, right) => {
		const leftId = getPokemonSpeciesIdFromUrl(left.url);
		const rightId = getPokemonSpeciesIdFromUrl(right.url);

		if (leftId !== null && rightId !== null) return leftId - rightId;
		if (leftId === null && rightId !== null) return 1;
		if (leftId !== null && rightId === null) return -1;

		return left.name.localeCompare(right.name);
	});

export const mapGenerationSpeciesToPokemonList = (
	speciesList: PokemonGenerationSpecies[],
): Pokemon[] =>
	sortGenerationSpeciesById(speciesList).map(species => {
		const speciesId = getPokemonSpeciesIdFromUrl(species.url);

		return {
			name: species.name,
			url: speciesId !== null ? `${API_URL}/${speciesId}` : `${API_URL}/${species.name}`,
		};
	});

export const buildGenerationSpeciesNameSet = (speciesList: PokemonGenerationSpecies[]) =>
	new Set(speciesList.map(species => species.name.trim().toLowerCase()).filter(Boolean));

export const fetchPokemonGenerationByNumber = (generationNumber: number) =>
	fetchJson<PokemonGenerationResponse>(`${GENERATION_URL}/${generationNumber}`);

export const usePokemonGeneration = (
	selectedGenerationOption: PokedexGenerationOption | null,
	enabled = true,
) => {
	const generationNumber = getGenerationNumberFromOption(selectedGenerationOption);

	return useQuery<PokemonGenerationResponse, Error, PokemonGenerationData>({
		queryKey: getPokemonGenerationQueryKey(generationNumber),
		queryFn: () => fetchPokemonGenerationByNumber(generationNumber as number),
		enabled: enabled && generationNumber !== null,
		staleTime: POKEMON_GENERATION_STALE_TIME_MS,
		gcTime: POKEMON_GENERATION_GC_TIME_MS,
		select: data => ({
			generationId: data.id,
			generationName: data.name,
			pokemonList: mapGenerationSpeciesToPokemonList(data.pokemon_species),
			speciesNameSet: buildGenerationSpeciesNameSet(data.pokemon_species),
		}),
	});
};
