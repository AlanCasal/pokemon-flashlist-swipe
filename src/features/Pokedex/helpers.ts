import { API_URL, HTTP_NOT_FOUND_STATUS } from '@constants/api';
import { POKEMON_TYPES, type PokemonType } from '@constants/index';
import {
	POKEDEX_HEIGHT_MEDIUM_MAX_DECIMETERS,
	POKEDEX_HEIGHT_SHORT_MAX_DECIMETERS,
	POKEDEX_WEIGHT_LIGHT_MAX_HECTOGRAMS,
	POKEDEX_WEIGHT_NORMAL_MAX_HECTOGRAMS,
	POKEMON_ID_FROM_URL_REGEX,
} from '@constants/pokedex';
import texts from '@utils/texts.json';

import {
	ActiveSearchValues,
	EmptySavedTextParts,
	GetActiveSearchValuesParams,
	GetDisplayedPokemonListParams,
	GetDoesPokemonMatchAppliedFiltersParams,
	PokedexFilterNumberRange,
	PokedexFilterState,
	PokemonTypeDamageRelationsByType,
	ShouldDarkenBackgroundForEmptySavedStateParams,
	ShouldFetchNextPageParams,
	ShouldShowSearchNotFoundParams,
} from '@/src/features/Pokedex/types';
import { PokedexHeightOption, PokedexSortOption, PokedexWeightOption } from '@/src/types';
import { PokemonDetails } from '@/src/types/pokemon';
import { Pokemon } from '@/src/types/pokemonList';

const EMPTY_SAVED_TEXT_ICON_PLACEHOLDER = '[pokeballIcon]';
const HTTP_BAD_REQUEST_STATUS = 400;
const SCROLL_TO_TOP_THRESHOLD = 20;
const SEARCH_NOT_FOUND_STATUSES = new Set([HTTP_BAD_REQUEST_STATUS, HTTP_NOT_FOUND_STATUS]);

const getHttpStatusFromErrorMessage = (errorMessage?: string) => {
	if (!errorMessage) return null;

	const statusMatch = errorMessage.match(/status\s+(\d{3})/i);
	if (!statusMatch?.[1]) return null;

	const parsedStatus = Number.parseInt(statusMatch[1], 10);
	return Number.isNaN(parsedStatus) ? null : parsedStatus;
};

export const shouldShowClearSearchButton = (searchValue: string) => searchValue.length > 0;

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

export const getActiveSearchValues = ({
	isSavedMode,
	allSearchValue,
	savedSearchValue,
	debouncedAllSearchValue,
	debouncedSavedSearchValue,
}: GetActiveSearchValuesParams): ActiveSearchValues => ({
	activeSearchValue: isSavedMode ? savedSearchValue : allSearchValue,
	activeDebouncedSearchValue: isSavedMode ? debouncedSavedSearchValue : debouncedAllSearchValue,
});

export const getDisplayedPokemonList = ({
	isSearchActive,
	isSavedMode,
	savedPokemonList,
	pokemonList,
	filteredSavedPokemonList,
	searchedPokemonList,
}: GetDisplayedPokemonListParams): Pokemon[] => {
	if (!isSearchActive) return isSavedMode ? savedPokemonList : pokemonList;
	if (isSavedMode) return filteredSavedPokemonList;

	return searchedPokemonList;
};

export const getIsSearchNotFoundError = (error?: Error | null) =>
	SEARCH_NOT_FOUND_STATUSES.has(getHttpStatusFromErrorMessage(error?.message) ?? -1);

export const getShouldShowSearchNotFound = ({
	isSearchActive,
	displayedPokemonCount,
	isSavedMode,
	isSearchingPokemon,
	isSearchError,
	isSearchNotFoundError,
}: ShouldShowSearchNotFoundParams) =>
	isSearchActive &&
	displayedPokemonCount === 0 &&
	(isSavedMode || (!isSearchingPokemon && (!isSearchError || isSearchNotFoundError)));

export const getShouldFetchNextPage = ({
	isSavedMode,
	isSearchActive,
	hasNextPage,
	isFetchingNextPage,
}: ShouldFetchNextPageParams) =>
	!isSavedMode && !isSearchActive && hasNextPage && !isFetchingNextPage;

export const getShouldDarkenBackgroundForEmptySavedState = ({
	isSavedMode,
	isSearchActive,
	savedPokemonCount,
}: ShouldDarkenBackgroundForEmptySavedStateParams) =>
	isSavedMode && !isSearchActive && savedPokemonCount === 0;

export const getPokemonNumberFromUrl = (url: string): number | null => {
	const normalizedUrl = url.trim().toLowerCase();
	if (!normalizedUrl) return null;

	const matches = normalizedUrl.match(POKEMON_ID_FROM_URL_REGEX);
	if (!matches?.[1]) return null;

	const parsed = Number.parseInt(matches[1], 10);
	return Number.isNaN(parsed) ? null : parsed;
};

const isPokemonType = (value: string): value is PokemonType =>
	POKEMON_TYPES.includes(value as PokemonType);

const getPokemonTypesFromDetails = (pokemonDetails: PokemonDetails): PokemonType[] =>
	Array.from(
		new Set(
			pokemonDetails.types
				.map(typeEntry => typeEntry.type.name.trim().toLowerCase())
				.filter(isPokemonType),
		),
	);

const getWeaknessMultiplierByType = ({
	damageRelationsByType,
	pokemonTypes,
}: {
	damageRelationsByType: PokemonTypeDamageRelationsByType;
	pokemonTypes: PokemonType[];
}) => {
	const multiplierByType = new Map<PokemonType, number>();

	POKEMON_TYPES.forEach(type => {
		multiplierByType.set(type, 1);
	});

	pokemonTypes.forEach(defendingType => {
		const relations = damageRelationsByType[defendingType]?.damage_relations;
		if (!relations) return;

		relations.double_damage_from.forEach(attackingType => {
			if (!isPokemonType(attackingType.name)) return;
			multiplierByType.set(attackingType.name, (multiplierByType.get(attackingType.name) ?? 1) * 2);
		});

		relations.half_damage_from.forEach(attackingType => {
			if (!isPokemonType(attackingType.name)) return;
			multiplierByType.set(
				attackingType.name,
				(multiplierByType.get(attackingType.name) ?? 1) * 0.5,
			);
		});

		relations.no_damage_from.forEach(attackingType => {
			if (!isPokemonType(attackingType.name)) return;
			multiplierByType.set(attackingType.name, 0);
		});
	});

	return multiplierByType;
};

export const getHeightOptionFromDecimeters = (heightDecimeters: number): PokedexHeightOption => {
	if (heightDecimeters <= POKEDEX_HEIGHT_SHORT_MAX_DECIMETERS) return 'short';
	if (heightDecimeters <= POKEDEX_HEIGHT_MEDIUM_MAX_DECIMETERS) return 'medium';

	return 'tall';
};

export const getWeightOptionFromHectograms = (weightHectograms: number): PokedexWeightOption => {
	if (weightHectograms <= POKEDEX_WEIGHT_LIGHT_MAX_HECTOGRAMS) return 'light';
	if (weightHectograms <= POKEDEX_WEIGHT_NORMAL_MAX_HECTOGRAMS) return 'normal';

	return 'heavy';
};

const getPokemonNumberForFilter = ({
	pokemon,
	pokemonDetails,
}: {
	pokemon: Pokemon;
	pokemonDetails: PokemonDetails;
}) => {
	const numberFromUrl = getPokemonNumberFromUrl(pokemon.url);
	if (numberFromUrl !== null) return numberFromUrl;

	const numberFromDetails = pokemonDetails.id;
	if (Number.isNaN(numberFromDetails)) return null;

	return numberFromDetails;
};

export const getDoesPokemonMatchNumberRangeFromListItem = ({
	pokemon,
	range,
}: {
	pokemon: Pokemon;
	range: PokedexFilterNumberRange;
}) => {
	const numberFromUrl = getPokemonNumberFromUrl(pokemon.url);
	if (numberFromUrl === null) return true;

	return numberFromUrl >= range.min && numberFromUrl <= range.max;
};

const getDoesPokemonMatchTypeFilters = ({
	pokemonDetails,
	selectedTypes,
}: {
	pokemonDetails: PokemonDetails;
	selectedTypes: PokemonType[];
}) => {
	if (selectedTypes.length === 0) return true;

	const pokemonTypes = getPokemonTypesFromDetails(pokemonDetails);
	return selectedTypes.some(type => pokemonTypes.includes(type));
};

const getDoesPokemonMatchWeaknessFilters = ({
	damageRelationsByType,
	pokemonDetails,
	selectedWeaknesses,
}: {
	damageRelationsByType: PokemonTypeDamageRelationsByType;
	pokemonDetails: PokemonDetails;
	selectedWeaknesses: PokemonType[];
}) => {
	if (selectedWeaknesses.length === 0) return true;

	const pokemonTypes = getPokemonTypesFromDetails(pokemonDetails);
	if (pokemonTypes.length === 0) return false;

	const multiplierByType = getWeaknessMultiplierByType({
		damageRelationsByType,
		pokemonTypes,
	});

	return selectedWeaknesses.some(weaknessType => (multiplierByType.get(weaknessType) ?? 1) > 1);
};

const getDoesPokemonMatchHeightFilters = ({
	pokemonDetails,
	selectedHeights,
}: {
	pokemonDetails: PokemonDetails;
	selectedHeights: PokedexHeightOption[];
}) => {
	if (selectedHeights.length === 0) return true;

	return selectedHeights.includes(getHeightOptionFromDecimeters(pokemonDetails.height));
};

const getDoesPokemonMatchWeightFilters = ({
	pokemonDetails,
	selectedWeights,
}: {
	pokemonDetails: PokemonDetails;
	selectedWeights: PokedexWeightOption[];
}) => {
	if (selectedWeights.length === 0) return true;

	return selectedWeights.includes(getWeightOptionFromHectograms(pokemonDetails.weight));
};

export const getDoesPokemonMatchAppliedFilters = ({
	damageRelationsByType,
	filterState,
	pokemon,
	pokemonDetails,
}: GetDoesPokemonMatchAppliedFiltersParams) => {
	const pokemonNumber = getPokemonNumberForFilter({ pokemon, pokemonDetails });
	if (pokemonNumber === null) return false;

	const isInNumberRange =
		pokemonNumber >= filterState.numberRange.min && pokemonNumber <= filterState.numberRange.max;
	if (!isInNumberRange) return false;

	const matchesTypeFilters = getDoesPokemonMatchTypeFilters({
		pokemonDetails,
		selectedTypes: filterState.selectedTypes,
	});
	if (!matchesTypeFilters) return false;

	const matchesWeaknessFilters = getDoesPokemonMatchWeaknessFilters({
		damageRelationsByType,
		pokemonDetails,
		selectedWeaknesses: filterState.selectedWeaknesses,
	});
	if (!matchesWeaknessFilters) return false;

	const matchesHeightFilters = getDoesPokemonMatchHeightFilters({
		pokemonDetails,
		selectedHeights: filterState.selectedHeights,
	});
	if (!matchesHeightFilters) return false;

	return getDoesPokemonMatchWeightFilters({
		pokemonDetails,
		selectedWeights: filterState.selectedWeights,
	});
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

// Supports single-select toggles by deselecting when the same option is pressed again.
export const getNextSingleSelectOption = <T extends string>(
	previousOption: T | null,
	nextOption: T,
) => (previousOption === nextOption ? null : nextOption);

export const getNextMultiSelectOptions = <T extends string>(
	previousOptions: T[],
	nextOption: T,
): T[] =>
	previousOptions.includes(nextOption)
		? previousOptions.filter(option => option !== nextOption)
		: [...previousOptions, nextOption];

export const getIsRangeMaxedOut = ({
	range,
	defaultRange,
}: {
	defaultRange: PokedexFilterNumberRange;
	range: PokedexFilterNumberRange;
}) => range.min === defaultRange.min && range.max === defaultRange.max;

export const getIsNumberRangeChanged = ({
	range,
	defaultRange,
}: {
	defaultRange: PokedexFilterNumberRange;
	range: PokedexFilterNumberRange;
}) => !getIsRangeMaxedOut({ range, defaultRange });

export const getAppliedFilterCount = ({
	filterState,
	defaultRange,
}: {
	defaultRange: PokedexFilterNumberRange;
	filterState: PokedexFilterState;
}) => {
	const baseCount =
		filterState.selectedTypes.length +
		filterState.selectedWeaknesses.length +
		filterState.selectedHeights.length +
		filterState.selectedWeights.length;
	const isRangeMaxedOut = getIsRangeMaxedOut({
		range: filterState.numberRange,
		defaultRange,
	});

	return baseCount + (isRangeMaxedOut ? 0 : 1);
};

export const getEmptySavedTextParts = (text: string): EmptySavedTextParts => {
	const [textBeforeIcon = '', textAfterIcon = ''] = text.split(EMPTY_SAVED_TEXT_ICON_PLACEHOLDER);
	const textBeforeIconLines = textBeforeIcon.split('\n');
	const textAfterIconLines = textAfterIcon.split('\n');

	const topLines = textBeforeIconLines.slice(0, -1);
	const iconPrefix = textBeforeIconLines[textBeforeIconLines.length - 1] ?? '';
	const [iconSuffix = '', ...bottomLines] = textAfterIconLines;

	return {
		bottomLines,
		iconPrefix,
		iconSuffix,
		shouldRenderIcon: text.includes(EMPTY_SAVED_TEXT_ICON_PLACEHOLDER),
		topLines,
	};
};

export const getEmptySavedToastConfig = (isSaved: boolean) => ({
	text: `Pokémon${
		isSaved ? texts.pokemonCard.toastSavedSuffix : texts.pokemonCard.toastRemovedSuffix
	}`,
	isPokeballColored: isSaved,
});
