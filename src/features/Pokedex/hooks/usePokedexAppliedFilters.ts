import { POKE_API_BASE_URL } from '@constants/api';
import { POKEMON_TYPES, type PokemonType } from '@constants/index';
import { POKEDEX_NUMBER_RANGE_DEFAULTS } from '@constants/pokedex';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { chunkArray, fetchJson } from '@utils/helpers';
import { useMemo } from 'react';

import { fetchPokemonDetails, getPokemonDetailsQueryKey } from '@/src/hooks/usePokemonDetails';
import type { PokemonDetails } from '@/src/types/pokemon';
import type { Pokemon } from '@/src/types/pokemonList';

import {
	getAppliedFilterCount,
	getDoesPokemonMatchAppliedFilters,
	getDoesPokemonMatchNumberRangeFromListItem,
} from '../helpers';
import type {
	PokedexFilterState,
	PokemonTypeDamageRelationsByType,
	PokemonTypeDamageRelationsResponse,
} from '../types';

const FILTER_DETAILS_FETCH_CONCURRENCY = 8;
const POKEMON_TYPE_DAMAGE_RELATIONS_QUERY_KEY = 'pokemon-type-damage-relations';

const isPokemonType = (value: string): value is PokemonType =>
	POKEMON_TYPES.includes(value as PokemonType);

const getPokemonTypeDamageRelationsQueryKey = (typeName: PokemonType) =>
	[POKEMON_TYPE_DAMAGE_RELATIONS_QUERY_KEY, typeName] as const;

const fetchPokemonTypeDamageRelations = (typeName: PokemonType) =>
	fetchJson<PokemonTypeDamageRelationsResponse>(`${POKE_API_BASE_URL}/type/${typeName}`);

interface UsePokedexAppliedFiltersParams {
	appliedFilterState: PokedexFilterState;
	candidatePokemonList: Pokemon[];
	enabled: boolean;
}

export const usePokedexAppliedFilters = ({
	appliedFilterState,
	candidatePokemonList,
	enabled,
}: UsePokedexAppliedFiltersParams) => {
	const queryClient = useQueryClient();

	const hasActiveFilter = useMemo(
		() =>
			getAppliedFilterCount({
				filterState: appliedFilterState,
				defaultRange: POKEDEX_NUMBER_RANGE_DEFAULTS,
			}) > 0,
		[appliedFilterState],
	);

	const filteredQuery = useQuery<Pokemon[], Error>({
		queryKey: [
			'pokedex-applied-filters',
			appliedFilterState,
			candidatePokemonList.map(({ name }) => name),
		],
		enabled: enabled && hasActiveFilter,
		queryFn: async () => {
			const numberPrefilteredPokemonList = candidatePokemonList.filter(pokemon =>
				getDoesPokemonMatchNumberRangeFromListItem({
					pokemon,
					range: appliedFilterState.numberRange,
				}),
			);

			if (numberPrefilteredPokemonList.length === 0) {
				return [];
			}

			const pokemonDetailsByName = new Map<string, PokemonDetails>();
			for (const pokemonChunk of chunkArray(
				numberPrefilteredPokemonList,
				FILTER_DETAILS_FETCH_CONCURRENCY,
			)) {
				const chunkDetails = await Promise.all(
					pokemonChunk.map(async pokemon => {
						const pokemonDetails = await queryClient.ensureQueryData({
							queryKey: getPokemonDetailsQueryKey(pokemon.url),
							queryFn: () => fetchPokemonDetails(pokemon.url),
						});

						return {
							pokemonName: pokemon.name,
							pokemonDetails,
						};
					}),
				);

				chunkDetails.forEach(({ pokemonName, pokemonDetails }) => {
					pokemonDetailsByName.set(pokemonName, pokemonDetails);
				});
			}

			const damageRelationsByType: PokemonTypeDamageRelationsByType = {};

			if (appliedFilterState.selectedWeaknesses.length > 0) {
				const requiredDefendingTypes = new Set<PokemonType>();

				pokemonDetailsByName.forEach(pokemonDetails => {
					pokemonDetails.types.forEach(typeEntry => {
						const typeName = typeEntry.type.name.trim().toLowerCase();
						if (!isPokemonType(typeName)) return;

						requiredDefendingTypes.add(typeName);
					});
				});

				const resolvedRelations = await Promise.all(
					Array.from(requiredDefendingTypes).map(async typeName => {
						const relationData = await queryClient.ensureQueryData({
							queryKey: getPokemonTypeDamageRelationsQueryKey(typeName),
							queryFn: () => fetchPokemonTypeDamageRelations(typeName),
						});

						return {
							typeName,
							relationData,
						};
					}),
				);

				resolvedRelations.forEach(({ typeName, relationData }) => {
					damageRelationsByType[typeName] = relationData;
				});
			}

			return numberPrefilteredPokemonList.filter(pokemon => {
				const pokemonDetails = pokemonDetailsByName.get(pokemon.name);
				if (!pokemonDetails) return false;

				return getDoesPokemonMatchAppliedFilters({
					damageRelationsByType,
					filterState: appliedFilterState,
					pokemon,
					pokemonDetails,
				});
			});
		},
	});

	const filteredPokemonList = hasActiveFilter ? (filteredQuery.data ?? []) : candidatePokemonList;

	return {
		filteredPokemonList,
		hasActiveFilter,
		isFilteringPokemonList: hasActiveFilter && filteredQuery.isLoading,
		isFilterError: filteredQuery.isError,
		filterError: filteredQuery.error,
	};
};
