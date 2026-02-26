import { POKE_API_BASE_URL, POKEMON_SPECIES_URL } from '@constants/api';
import type { PokemonType } from '@constants/index';
import { POKEMON_TYPES } from '@constants/index';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import type { PokemonDetails } from '@/src/types/pokemon';
import type { PokemonSpecies } from '@/src/types/pokemonSpecies';
import { fetchJson } from '@/src/utils/helpers';

import {
	buildPokemonAboutData,
	type PokemonTypeDamageRelationsResponse,
} from '../tabs/About/helpers';

const isPokemonType = (value: string): value is PokemonType =>
	POKEMON_TYPES.includes(value as PokemonType);

interface UsePokemonAboutDataArgs {
	pokemonDetails?: PokemonDetails;
	pokemonId: string;
}

export const usePokemonAboutData = ({ pokemonDetails, pokemonId }: UsePokemonAboutDataArgs) => {
	const normalizedPokemonId = pokemonId.trim();
	const hasPokemonId = normalizedPokemonId.length > 0;

	const speciesQuery = useQuery<PokemonSpecies>({
		queryKey: ['pokemon-species', normalizedPokemonId],
		enabled: hasPokemonId,
		queryFn: () => fetchJson<PokemonSpecies>(`${POKEMON_SPECIES_URL}/${normalizedPokemonId}`),
	});

	const pokemonTypes = useMemo(
		() =>
			(pokemonDetails?.types ?? [])
				.map(typeEntry => typeEntry.type.name.toLowerCase())
				.filter(isPokemonType),
		[pokemonDetails?.types],
	);

	const uniquePokemonTypes = useMemo(() => Array.from(new Set(pokemonTypes)), [pokemonTypes]);

	const typeQueries = useQueries({
		queries: uniquePokemonTypes.map(typeName => ({
			queryKey: ['pokemon-type-damage-relations', typeName],
			enabled: hasPokemonId,
			queryFn: () =>
				fetchJson<PokemonTypeDamageRelationsResponse>(`${POKE_API_BASE_URL}/type/${typeName}`),
		})),
	});

	const damageRelationsByType = useMemo(
		() =>
			typeQueries.reduce<Partial<Record<PokemonType, PokemonTypeDamageRelationsResponse>>>(
				(accumulator, query, index) => {
					const currentType = uniquePokemonTypes[index];
					if (!currentType || !query.data) return accumulator;

					accumulator[currentType] = query.data;
					return accumulator;
				},
				{},
			),
		[typeQueries, uniquePokemonTypes],
	);

	const aboutData = useMemo(
		() =>
			buildPokemonAboutData({
				damageRelationsByType,
				pokemonDetails,
				speciesData: speciesQuery.data,
			}),
		[damageRelationsByType, pokemonDetails, speciesQuery.data],
	);

	const typeRelationsError = typeQueries.find(query => query.error)?.error || null;
	const isTypeRelationsLoading = typeQueries.some(query => query.isLoading);
	const aboutError = speciesQuery.error || typeRelationsError;
	const isAboutLoading = speciesQuery.isLoading || isTypeRelationsLoading;

	return {
		aboutData,
		aboutError,
		damageRelationsByType,
		isAboutLoading,
		isTypeRelationsLoading,
		typeRelationsError,
	};
};
