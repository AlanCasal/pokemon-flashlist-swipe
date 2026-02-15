import { API_URL, HTTP_NOT_FOUND_STATUS } from '@constants/api';
import { POKEMON_ID_FROM_URL_REGEX } from '@constants/pokedex';
import { sharedStyles } from '@constants/sharedStyles';

import { PokedexSortOption } from '@/src/types';
import { PokemonDetails } from '@/src/types/pokemon';
import { Pokemon } from '@/src/types/pokemonList';

export const shouldShowScrollToTop = (scrollY: number) =>
	scrollY > sharedStyles.spacing.scrollToTopThreshold;

export const normalizeSavedPokemonName = (value: string) => {
	const normalizedValue = value.trim().toLowerCase();
	if (!normalizedValue) return '';
	if (!normalizedValue.includes('/')) return normalizedValue;

	const segments = normalizedValue.split('/').filter(Boolean);
	return segments[segments.length - 1] ?? '';
};

export const getSearchedPokemonList = (searchedPokemon?: PokemonDetails): Pokemon[] =>
	searchedPokemon
		? [{ name: searchedPokemon.name, url: `${API_URL}/${searchedPokemon.name}` }]
		: [];

export const getFilteredSavedPokemonList = (
	savedPokemonList: Pokemon[],
	normalizedSearchValue: string,
) => savedPokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(normalizedSearchValue));

export const getIsSearchNotFoundError = (error?: Error | null) =>
	Boolean(error?.message.includes(String(HTTP_NOT_FOUND_STATUS)));

export const getShouldShowSearchNotFound = ({
	isSearchActive,
	displayedPokemonCount,
	isSavedMode,
	isSearchingPokemon,
	isSearchError,
	isSearchNotFoundError,
}: {
	isSearchActive: boolean;
	displayedPokemonCount: number;
	isSavedMode: boolean;
	isSearchingPokemon: boolean;
	isSearchError: boolean;
	isSearchNotFoundError: boolean;
}) =>
	isSearchActive &&
	displayedPokemonCount === 0 &&
	(isSavedMode || (!isSearchingPokemon && (!isSearchError || isSearchNotFoundError)));

export const getPokemonNumberFromUrl = (url: string): number | null => {
	const normalizedUrl = url.trim().toLowerCase();
	if (!normalizedUrl) return null;

	const matches = normalizedUrl.match(POKEMON_ID_FROM_URL_REGEX);
	if (!matches?.[1]) return null;

	const parsed = Number.parseInt(matches[1], 10);
	return Number.isNaN(parsed) ? null : parsed;
};

const sortByNumberAscending = (left: Pokemon, right: Pokemon) => {
	const leftNumber = getPokemonNumberFromUrl(left.url);
	const rightNumber = getPokemonNumberFromUrl(right.url);

	if (leftNumber !== null && rightNumber !== null) return leftNumber - rightNumber;
	if (leftNumber === null && rightNumber !== null) return 1;
	if (leftNumber !== null && rightNumber === null) return -1;

	return left.name.localeCompare(right.name);
};

const sortByNameAscending = (left: Pokemon, right: Pokemon) => left.name.localeCompare(right.name);

export const getSortedPokemonList = (
	pokemonList: Pokemon[],
	sortOption: PokedexSortOption | null,
): Pokemon[] => {
	if (!sortOption) return pokemonList;

	const sortedList = [...pokemonList];

	const sorted = {
		number_asc: sortByNumberAscending,
		number_desc: (left: Pokemon, right: Pokemon) => sortByNumberAscending(right, left),
		alpha_asc: sortByNameAscending,
		alpha_desc: (left: Pokemon, right: Pokemon) => sortByNameAscending(right, left),
	}[sortOption];

	return sorted ? sortedList.sort(sorted) : pokemonList;
};
