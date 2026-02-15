import { API_URL, HTTP_NOT_FOUND_STATUS } from '@constants/api';
import { SCROLL_TO_TOP_THRESHOLD } from '@constants/sharedStyles';

import { PokemonDetails } from '@/src/types/pokemon';
import { Pokemon } from '@/src/types/pokemonList';

export const shouldShowScrollToTop = (scrollY: number) => scrollY > SCROLL_TO_TOP_THRESHOLD;

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
