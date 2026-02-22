import { API_URL } from '@constants/api';
import { typeColors } from '@constants/colors';
import { useGetPokemonEvolutions } from '@hooks/useGetPokemonEvolution';
import usePokemonDetails from '@hooks/usePokemonDetails';
import { useIsPokemonSaved } from '@store/savedStore';
import texts from '@utils/texts.json';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import type { PokemonType } from '@/src/types/pokemonTypes';

import {
	formatPokemonName,
	formatPokemonNumber,
	getPrimaryTypeFromParam,
	getRouteParamValue,
} from '../helpers';
import type { EvolutionChartController, EvolutionChartTabConfig, EvolutionTab } from '../types';

const isPokemonType = (value: string): value is PokemonType => value in typeColors;

export const useEvolutionChartController = (): EvolutionChartController => {
	const [activeTab, setActiveTab] = useState<EvolutionTab>('evolution');
	const { id, type } = useLocalSearchParams<{ id?: string | string[]; type?: string | string[] }>();

	const pokemonId = getRouteParamValue(id);
	const hasPokemonId = pokemonId.length > 0;
	const fallbackType = getPrimaryTypeFromParam(type);
	const pokemonUrl = hasPokemonId ? `${API_URL}/${pokemonId}` : '';
	const { data: pokemonDetails, isLoading: isPokemonLoading } = usePokemonDetails(pokemonUrl);
	const isSaved = useIsPokemonSaved(pokemonDetails?.name);
	const {
		data: evolutionData,
		isLoading: isEvolutionLoading,
		error: evolutionError,
	} = useGetPokemonEvolutions(hasPokemonId ? pokemonId : '');

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

	const pokemonNumericId = useMemo(() => {
		if (pokemonDetails?.id) return pokemonDetails.id;

		const parsedRouteId = Number(pokemonId);
		return Number.isNaN(parsedRouteId) ? undefined : parsedRouteId;
	}, [pokemonDetails, pokemonId]);

	const tabConfig = useMemo<EvolutionChartTabConfig[]>(
		() => [
			{ id: 'about', label: texts.evolution.aboutTabLabel },
			{ id: 'stats', label: texts.evolution.statsTabLabel },
			{ id: 'evolution', label: texts.evolution.evolutionTabLabel },
		],
		[],
	);

	const onTabPress = useCallback((tab: EvolutionTab) => {
		setActiveTab(tab);
	}, []);

	return {
		activeTab,
		displayName: formatPokemonName(pokemonDetails?.name),
		evolutionData,
		evolutionError,
		formattedId: formatPokemonNumber(pokemonNumericId),
		hasPokemonId,
		heroImageUrl: pokemonDetails?.sprites.other['official-artwork'].front_default,
		isEvolutionLoading,
		isPokemonLoading,
		isSaved,
		onTabPress,
		primaryType,
		tabConfig,
		typeChips,
	};
};
