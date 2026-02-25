import { typeColors } from '@constants/colors';
import type { PokemonType } from '@constants/index';

import type { PokemonDetails } from '@/src/types/pokemon';
import type { PokemonSpecies } from '@/src/types/pokemonSpecies';

import type { PokemonAboutData, PokemonAboutRow, PokemonWeaknessBadge } from '../../types';

interface NamedResource {
	name: string;
}

export interface PokemonTypeDamageRelationsResponse {
	damage_relations: {
		double_damage_from: NamedResource[];
		half_damage_from: NamedResource[];
		no_damage_from: NamedResource[];
	};
}

export interface BuildPokemonAboutDataArgs {
	damageRelationsByType: Partial<Record<PokemonType, PokemonTypeDamageRelationsResponse>>;
	pokemonDetails?: PokemonDetails;
	speciesData?: PokemonSpecies;
}

interface GroupedGameIndex {
	index: number;
	versions: string[];
}

const FEET_IN_INCHES = 12;
const METERS_IN_DECIMETER = 10;
const KG_IN_HECTOGRAM = 10;
const LBS_PER_KG = 2.2046226218;
const INCHES_PER_METER = 39.3700787402;
const FEMALE_RATE_DIVISOR = 8;

const isPokemonType = (value: string): value is PokemonType => value in typeColors;

const formatWithSingleDecimal = (value: number) => value.toFixed(1);

const capitalizeWord = (value: string) => {
	if (!value) return value;
	return `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`;
};

export const humanizePokemonName = (value: string | undefined) => {
	if (!value) return '--';

	return value
		.split('-')
		.map(segment => capitalizeWord(segment))
		.join(' ');
};

export const normalizeFlavorText = (value: string | undefined) => {
	if (!value) return '--';

	return value
		.replace(/[\n\f\r]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
};

export const formatHeight = (heightDecimeters: number | undefined) => {
	if (typeof heightDecimeters !== 'number' || Number.isNaN(heightDecimeters)) {
		return { primary: '--' };
	}

	const meters = heightDecimeters / METERS_IN_DECIMETER;
	const totalInches = Math.round(meters * INCHES_PER_METER);
	const feet = Math.floor(totalInches / FEET_IN_INCHES);
	const inches = totalInches % FEET_IN_INCHES;

	return {
		primary: `${formatWithSingleDecimal(meters)}m`,
		secondary: `(${feet}'${inches.toString().padStart(2, '0')}")`,
	};
};

export const formatWeight = (weightHectograms: number | undefined) => {
	if (typeof weightHectograms !== 'number' || Number.isNaN(weightHectograms)) {
		return { primary: '--' };
	}

	const kilograms = weightHectograms / KG_IN_HECTOGRAM;
	const pounds = kilograms * LBS_PER_KG;

	return {
		primary: `${formatWithSingleDecimal(kilograms)}kg`,
		secondary: `(${formatWithSingleDecimal(pounds)} lbs)`,
	};
};

const formatPokemonStatName = (name: string) => {
	if (name.toLowerCase() === 'hp') return 'HP';

	return name
		.split('-')
		.map(segment => {
			if (segment.toLowerCase() === 'hp') return 'HP';
			return capitalizeWord(segment);
		})
		.join(' ');
};

export const formatEvYield = (stats: PokemonDetails['stats'] | undefined) => {
	if (!stats || stats.length === 0) return '--';

	const effortStats = stats
		.filter(stat => stat.effort > 0)
		.map(stat => `${stat.effort} ${formatPokemonStatName(stat.stat.name)}`);

	return effortStats.length > 0 ? effortStats.join(', ') : '--';
};

const formatPercentage = (value: number) => {
	const roundedValue = Number(value.toFixed(1));
	return Number.isInteger(roundedValue)
		? `${roundedValue.toFixed(0)}%`
		: `${roundedValue.toFixed(1)}%`;
};

export const formatGenderRatio = (genderRate: number | undefined) => {
	if (genderRate === -1 || typeof genderRate !== 'number' || Number.isNaN(genderRate)) {
		return null;
	}

	const femaleRatio = (genderRate / FEMALE_RATE_DIVISOR) * 100;
	const maleRatio = 100 - femaleRatio;

	return {
		female: formatPercentage(femaleRatio),
		male: formatPercentage(maleRatio),
	};
};

export const getEnglishFlavorText = (speciesData: PokemonSpecies | undefined) => {
	if (!speciesData) return '--';

	return (
		speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text ?? '--'
	);
};

export const getEnglishGenus = (speciesData: PokemonSpecies | undefined) => {
	if (!speciesData) return '--';

	return speciesData.genera.find(entry => entry.language.name === 'en')?.genus ?? '--';
};

export const groupGameIndices = (gameIndices: PokemonDetails['game_indices'] | undefined) => {
	if (!gameIndices || gameIndices.length === 0) return [];

	const groupedMap = gameIndices.reduce<Map<number, Set<string>>>((acc, entry) => {
		const currentVersions = acc.get(entry.game_index) ?? new Set<string>();
		currentVersions.add(entry.version.name);
		acc.set(entry.game_index, currentVersions);
		return acc;
	}, new Map<number, Set<string>>());

	return Array.from(groupedMap.entries())
		.map<GroupedGameIndex>(([index, versions]) => ({
			index,
			versions: Array.from(versions),
		}))
		.sort((a, b) => a.index - b.index);
};

const formatVersionLabel = (versions: string[]) =>
	`(${versions.map(version => humanizePokemonName(version)).join('/')})`;

const formatLocationRows = (
	gameIndices: PokemonDetails['game_indices'] | undefined,
): PokemonAboutRow[] => {
	const groupedIndices = groupGameIndices(gameIndices);

	if (groupedIndices.length === 0) {
		return [{ label: '--', kind: 'text', value: '--' }];
	}

	return groupedIndices.map(entry => ({
		kind: 'text',
		label: entry.index.toString().padStart(3, '0'),
		value: formatVersionLabel(entry.versions),
	}));
};

export const getTypeWeaknesses = ({
	damageRelationsByType,
	pokemonTypes,
}: {
	damageRelationsByType: Partial<Record<PokemonType, PokemonTypeDamageRelationsResponse>>;
	pokemonTypes: PokemonType[];
}): PokemonWeaknessBadge[] => {
	if (pokemonTypes.length === 0) return [];

	const multiplierByType = new Map<PokemonType, number>();

	Object.keys(typeColors).forEach(type => {
		if (isPokemonType(type)) multiplierByType.set(type, 1);
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

	return Array.from(multiplierByType.entries())
		.filter(([, multiplier]) => multiplier > 1)
		.sort(([leftName, leftMultiplier], [rightName, rightMultiplier]) => {
			if (rightMultiplier !== leftMultiplier) return rightMultiplier - leftMultiplier;
			return leftName.localeCompare(rightName);
		})
		.map(([type, multiplier]) => ({
			label: humanizePokemonName(type),
			multiplier,
			type,
		}));
};

const formatAbilities = (abilities: PokemonDetails['abilities'] | undefined) => {
	if (!abilities || abilities.length === 0) {
		return {
			primary: '--',
		};
	}

	const normalAbilities = abilities
		.filter(abilityEntry => !abilityEntry.is_hidden)
		.sort((left, right) => left.slot - right.slot)
		.map(
			(abilityEntry, index) => `${index + 1}. ${humanizePokemonName(abilityEntry.ability.name)}`,
		);

	const hiddenAbilities = abilities
		.filter(abilityEntry => abilityEntry.is_hidden)
		.map(abilityEntry => humanizePokemonName(abilityEntry.ability.name));

	return {
		primary: normalAbilities.join(', ') || '--',
		secondary:
			hiddenAbilities.length > 0 ? `${hiddenAbilities.join(', ')} (hidden ability)` : undefined,
	};
};

const buildPokedexSectionRows = ({
	damageRelationsByType,
	pokemonDetails,
	speciesData,
}: BuildPokemonAboutDataArgs): PokemonAboutRow[] => {
	const height = formatHeight(pokemonDetails?.height);
	const weight = formatWeight(pokemonDetails?.weight);
	const abilities = formatAbilities(pokemonDetails?.abilities);

	const pokemonTypes = (pokemonDetails?.types ?? [])
		.map(typeEntry => typeEntry.type.name.toLowerCase())
		.filter(isPokemonType);

	return [
		{
			kind: 'text',
			label: 'Species',
			value: getEnglishGenus(speciesData),
		},
		{
			kind: 'textWithSecondary',
			label: 'Height',
			secondaryMode: 'inline',
			value: height.primary,
			secondaryValue: height.secondary,
		},
		{
			kind: 'textWithSecondary',
			label: 'Weight',
			secondaryMode: 'inline',
			value: weight.primary,
			secondaryValue: weight.secondary,
		},
		{
			kind: 'textWithSecondary',
			label: 'Abilities',
			secondaryMode: 'block',
			value: abilities.primary,
			secondaryValue: abilities.secondary,
		},
		{
			kind: 'weaknessBadges',
			label: 'Weaknesses',
			weaknesses: getTypeWeaknesses({
				damageRelationsByType,
				pokemonTypes,
			}),
		},
	];
};

const buildTrainingSectionRows = ({
	pokemonDetails,
	speciesData,
}: BuildPokemonAboutDataArgs): PokemonAboutRow[] => [
	{
		kind: 'text',
		label: 'EV Yield',
		value: formatEvYield(pokemonDetails?.stats),
	},
	{
		kind: 'text',
		label: 'Catch Rate',
		value: speciesData?.capture_rate?.toString() ?? '--',
	},
	{
		kind: 'text',
		label: 'Base Friendship',
		value: speciesData?.base_happiness?.toString() ?? '--',
	},
	{
		kind: 'text',
		label: 'Base Exp',
		value: pokemonDetails?.base_experience?.toString() ?? '--',
	},
	{
		kind: 'text',
		label: 'Growth Rate',
		value: humanizePokemonName(speciesData?.growth_rate?.name),
	},
];

const buildBreedingSectionRows = ({
	speciesData,
}: BuildPokemonAboutDataArgs): PokemonAboutRow[] => {
	const genderRatio = formatGenderRatio(speciesData?.gender_rate);

	return [
		genderRatio
			? {
					kind: 'genderSplit',
					label: 'Gender',
					femaleValue: genderRatio.female,
					maleValue: genderRatio.male,
				}
			: {
					kind: 'text',
					label: 'Gender',
					value: '--',
				},
		{
			kind: 'text',
			label: 'Egg Groups',
			value:
				speciesData?.egg_groups?.map(group => humanizePokemonName(group.name)).join(', ') || '--',
		},
		{
			kind: 'text',
			label: 'Egg Cycles',
			value: speciesData?.hatch_counter?.toString() ?? '--',
		},
	];
};

export const buildPokemonAboutData = ({
	damageRelationsByType,
	pokemonDetails,
	speciesData,
}: BuildPokemonAboutDataArgs): PokemonAboutData => ({
	description: normalizeFlavorText(getEnglishFlavorText(speciesData)),
	sections: [
		{
			rows: buildPokedexSectionRows({
				damageRelationsByType,
				pokemonDetails,
				speciesData,
			}),
			title: 'Pokédex Data',
		},
		{
			rows: buildTrainingSectionRows({
				damageRelationsByType,
				pokemonDetails,
				speciesData,
			}),
			title: 'Training',
		},
		{
			rows: buildBreedingSectionRows({
				damageRelationsByType,
				pokemonDetails,
				speciesData,
			}),
			title: 'Breeding',
		},
		{
			rows: formatLocationRows(pokemonDetails?.game_indices),
			title: 'Location',
		},
	],
});
