import { POKEMON_TYPES, type PokemonType } from '@constants/index';

import type { PokemonDetails } from '@/src/types/pokemon';

import type {
	PokemonBaseStatKey,
	PokemonBaseStatRow,
	PokemonStatsData,
	PokemonTypeDefense,
} from '../../types';
import type { PokemonTypeDamageRelationsResponse } from '../About/helpers';

const BASE_STAT_SCALE_MAX = 255;
const LEVEL = 100;
const MAX_IV = 31;
const MAX_EV = 252;
const MIN_IV = 0;
const MIN_EV = 0;
const BENEFICIAL_NATURE = 1.1;
const HINDERING_NATURE = 0.9;

const BASE_STAT_CONFIG: Array<{ key: PokemonBaseStatKey; labelKey: string }> = [
	{ key: 'hp', labelKey: 'stats.baseStatLabels.hp' },
	{ key: 'attack', labelKey: 'stats.baseStatLabels.attack' },
	{ key: 'defense', labelKey: 'stats.baseStatLabels.defense' },
	{ key: 'special-attack', labelKey: 'stats.baseStatLabels.special_attack' },
	{ key: 'special-defense', labelKey: 'stats.baseStatLabels.special_defense' },
	{ key: 'speed', labelKey: 'stats.baseStatLabels.speed' },
];

const DAMAGE_MULTIPLIER_LABELS = new Map<number, string>([
	[0, '0'],
	[0.25, '¼'],
	[0.5, '½'],
	[1, ''],
	[2, '2'],
	[4, '4'],
]);

const isPokemonType = (value: string): value is PokemonType =>
	POKEMON_TYPES.includes(value as PokemonType);

const getEvContribution = (ev: number) => Math.floor(ev / 4);

const normalizeMultiplier = (value: number) => Math.round(value * 100) / 100;

const buildBaseStatsMap = (stats: PokemonDetails['stats'] | undefined) =>
	(stats ?? []).reduce<Partial<Record<PokemonBaseStatKey, number>>>((accumulator, statEntry) => {
		const statKey = statEntry.stat.name as PokemonBaseStatKey;
		if (!BASE_STAT_CONFIG.some(config => config.key === statKey)) return accumulator;

		accumulator[statKey] = statEntry.base_stat;
		return accumulator;
	}, {});

const getHpRange = (baseStat: number | null) => {
	if (baseStat === null) return { min: null, max: null };

	const min = 2 * baseStat + MIN_IV + getEvContribution(MIN_EV) + LEVEL + 10;
	const max = 2 * baseStat + MAX_IV + getEvContribution(MAX_EV) + LEVEL + 10;
	return { min, max };
};

const getNonHpRange = (baseStat: number | null) => {
	if (baseStat === null) return { min: null, max: null };

	const minBase = 2 * baseStat + MIN_IV + getEvContribution(MIN_EV) + 5;
	const maxBase = 2 * baseStat + MAX_IV + getEvContribution(MAX_EV) + 5;

	return {
		min: Math.floor(minBase * HINDERING_NATURE),
		max: Math.floor(maxBase * BENEFICIAL_NATURE),
	};
};

export const formatDefenseMultiplier = (multiplier: number) => {
	const normalizedMultiplier = normalizeMultiplier(multiplier);
	const mappedLabel = DAMAGE_MULTIPLIER_LABELS.get(normalizedMultiplier);
	if (mappedLabel !== undefined) return mappedLabel;

	return Number.isInteger(normalizedMultiplier)
		? normalizedMultiplier.toString()
		: normalizedMultiplier.toFixed(2);
};

export const buildBaseStatRows = (
	stats: PokemonDetails['stats'] | undefined,
	translate: (key: string) => string,
): PokemonBaseStatRow[] => {
	const statMap = buildBaseStatsMap(stats);

	return BASE_STAT_CONFIG.map(({ key, labelKey }) => {
		const value = statMap[key] ?? null;
		const { min, max } = key === 'hp' ? getHpRange(value) : getNonHpRange(value);
		const barFillRatio = value === null ? 0 : Math.min(value / BASE_STAT_SCALE_MAX, 1);

		return {
			barFillRatio,
			key,
			label: translate(labelKey),
			max,
			min,
			value,
		};
	});
};

export const buildTypeDefenses = ({
	damageRelationsByType,
	pokemonTypes,
}: {
	damageRelationsByType: Partial<Record<PokemonType, PokemonTypeDamageRelationsResponse>>;
	pokemonTypes: PokemonType[];
}): PokemonTypeDefense[] => {
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

	return POKEMON_TYPES.map(type => {
		const multiplier = normalizeMultiplier(multiplierByType.get(type) ?? 1);

		return {
			multiplier,
			multiplierLabel: formatDefenseMultiplier(multiplier),
			type,
		};
	});
};

export const buildPokemonStatsData = ({
	damageRelationsByType,
	pokemonDetails,
	translate,
}: {
	damageRelationsByType: Partial<Record<PokemonType, PokemonTypeDamageRelationsResponse>>;
	pokemonDetails?: PokemonDetails;
	translate: (key: string) => string;
}): PokemonStatsData => {
	const baseStats = buildBaseStatRows(pokemonDetails?.stats, translate);
	const totalBaseStat = baseStats.some(row => row.value === null)
		? null
		: baseStats.reduce((total, row) => total + (row.value ?? 0), 0);

	const pokemonTypes = (pokemonDetails?.types ?? [])
		.map(typeEntry => typeEntry.type.name.toLowerCase())
		.filter(isPokemonType);

	const uniquePokemonTypes = Array.from(new Set(pokemonTypes));
	const typeDefenses = buildTypeDefenses({
		damageRelationsByType,
		pokemonTypes: uniquePokemonTypes,
	});

	return {
		baseStats,
		totalBaseStat,
		typeDefenses,
	};
};
