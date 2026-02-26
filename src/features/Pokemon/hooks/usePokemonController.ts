import { API_URL } from '@constants/api';
import { typeColors } from '@constants/colors';
import type { PokemonType } from '@constants/index';
import { useGetPokemonEvolutions } from '@hooks/useGetPokemonEvolution';
import usePokemonDetails from '@hooks/usePokemonDetails';
import { useIsPokemonSaved, useSavedPokemons } from '@store/savedStore';
import texts from '@utils/texts.json';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import {
	formatPokemonName,
	formatPokemonNumber,
	getPrimaryTypeFromParam,
	getRouteParamValue,
	getSelectedPokemonName,
	handleEvolutionPokemonPress,
} from '../helpers';
import { buildPokemonStatsData } from '../tabs/Stats/helpers';
import type { EvolutionTab, PokemonController, PokemonTabConfig } from '../types';
import { usePokemonAboutData } from './usePokemonAboutData';

const isPokemonType = (value: string): value is PokemonType => value in typeColors;

export const usePokemonController = (): PokemonController => {
	const [activeTab, setActiveTab] = useState<EvolutionTab>('about');
	const router = useRouter();
	const { id, type } = useLocalSearchParams<{ id?: string | string[]; type?: string | string[] }>();

	const pokemonId = getRouteParamValue(id);
	const hasPokemonId = pokemonId.length > 0;
	const fallbackType = getPrimaryTypeFromParam(type);
	const pokemonUrl = hasPokemonId ? `${API_URL}/${pokemonId}` : '';
	const {
		data: pokemonDetails,
		error: pokemonDetailsError,
		isLoading: isPokemonLoading,
	} = usePokemonDetails(pokemonUrl);
	const savedPokemons = useSavedPokemons();
	const isSaved = useIsPokemonSaved(pokemonDetails?.name);
	const {
		data: evolutionData,
		isLoading: isEvolutionLoading,
		error: evolutionError,
	} = useGetPokemonEvolutions(hasPokemonId ? pokemonId : '');
	const {
		aboutData,
		aboutError,
		damageRelationsByType,
		isAboutLoading,
		isTypeRelationsLoading,
		typeRelationsError,
	} = usePokemonAboutData({
		pokemonDetails,
		pokemonId,
	});

	const primaryType = useMemo<keyof typeof typeColors>(() => {
		const routeType = pokemonDetails?.types[0]?.type.name?.toLowerCase();
		if (routeType && routeType in typeColors) return routeType as keyof typeof typeColors;
		return fallbackType;
	}, [fallbackType, pokemonDetails]);

	const typeChips = useMemo<PokemonType[]>(() => {
		if (!pokemonDetails?.types) return [fallbackType];

		const uniqueTypes = new Set(
			pokemonDetails.types
				.map(({ type: pokemonType }) => pokemonType.name.toLowerCase())
				.filter(isPokemonType),
		);

		if (uniqueTypes.size === 0) return [fallbackType];

		return Array.from(uniqueTypes);
	}, [fallbackType, pokemonDetails]);
	const statsTypes = useMemo<PokemonType[]>(() => {
		if (!pokemonDetails?.types) return [];

		return Array.from(
			new Set(
				pokemonDetails.types
					.map(({ type: pokemonType }) => pokemonType.name.toLowerCase())
					.filter(isPokemonType),
			),
		);
	}, [pokemonDetails?.types]);

	const pokemonNumericId = useMemo(() => {
		if (pokemonDetails?.id) return pokemonDetails.id;

		const parsedRouteId = Number(pokemonId);
		return Number.isNaN(parsedRouteId) ? undefined : parsedRouteId;
	}, [pokemonDetails, pokemonId]);

	const selectedPokemonName = useMemo(
		() =>
			getSelectedPokemonName({
				pokemonDetailsName: pokemonDetails?.name,
				routePokemonId: pokemonId,
			}),
		[pokemonDetails?.name, pokemonId],
	);

	const tabConfig = useMemo<PokemonTabConfig[]>(
		() => [
			{ id: 'about', label: texts.evolution.aboutTabLabel },
			{ id: 'stats', label: texts.evolution.statsTabLabel },
			{ id: 'evolution', label: texts.evolution.evolutionTabLabel },
		],
		[],
	);
	const statsError = pokemonDetailsError || typeRelationsError;
	const isStatsLoading = isPokemonLoading || isTypeRelationsLoading;
	const hasCompleteTypeRelations = useMemo(
		() =>
			statsTypes.length > 0 &&
			statsTypes.every(defendingType => damageRelationsByType[defendingType]),
		[damageRelationsByType, statsTypes],
	);
	const statsData = useMemo(() => {
		if (!pokemonDetails || isStatsLoading || statsError || !hasCompleteTypeRelations) {
			return undefined;
		}

		return buildPokemonStatsData({
			damageRelationsByType,
			pokemonDetails,
		});
	}, [damageRelationsByType, hasCompleteTypeRelations, isStatsLoading, pokemonDetails, statsError]);

	const onTabPress = useCallback((tab: EvolutionTab) => {
		setActiveTab(tab);
	}, []);

	const onEvolutionPokemonPress = useCallback(
		(pokemonName: string) => {
			handleEvolutionPokemonPress({
				pokemonName,
				selectedPokemonName,
				setParams: params => router.setParams(params),
			});
		},
		[router, selectedPokemonName],
	);

	return {
		activeTab,
		aboutData,
		aboutError,
		displayName: formatPokemonName(pokemonDetails?.name),
		evolutionData,
		evolutionError,
		formattedId: formatPokemonNumber(pokemonNumericId),
		hasPokemonId,
		heroImageUrl: pokemonDetails?.sprites.other['official-artwork'].front_default,
		isAboutLoading,
		isEvolutionLoading,
		isPokemonLoading,
		isSaved,
		isStatsLoading,
		onEvolutionPokemonPress,
		onTabPress,
		primaryType,
		savedPokemons,
		selectedPokemonName,
		statsData,
		statsError,
		tabConfig,
		typeChips,
	};
};
