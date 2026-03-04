import { typeColors } from '@constants/colors';
import type { PokemonType } from '@constants/index';

import type { SupportedLanguage } from '@/src/i18n/language';
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
	language: SupportedLanguage;
	translate: (key: string) => string;
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

export const formatHeight = (heightDecimeters: number | undefined, metersUnit = 'm') => {
	if (typeof heightDecimeters !== 'number' || Number.isNaN(heightDecimeters)) {
		return { primary: '--' };
	}

	const meters = heightDecimeters / METERS_IN_DECIMETER;
	const totalInches = Math.round(meters * INCHES_PER_METER);
	const feet = Math.floor(totalInches / FEET_IN_INCHES);
	const inches = totalInches % FEET_IN_INCHES;

	return {
		primary: `${formatWithSingleDecimal(meters)}${metersUnit}`,
		secondary: `(${feet}'${inches.toString().padStart(2, '0')}")`,
	};
};

export const formatWeight = (
	weightHectograms: number | undefined,
	kgUnit = 'kg',
	lbsUnit = 'lbs',
) => {
	if (typeof weightHectograms !== 'number' || Number.isNaN(weightHectograms)) {
		return { primary: '--' };
	}

	const kilograms = weightHectograms / KG_IN_HECTOGRAM;
	const pounds = kilograms * LBS_PER_KG;

	return {
		primary: `${formatWithSingleDecimal(kilograms)}${kgUnit}`,
		secondary: `(${formatWithSingleDecimal(pounds)} ${lbsUnit})`,
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

const getLanguageCodes = (language: SupportedLanguage) => {
	if (language === 'ja') return ['ja-Hrkt', 'ja'];
	return [language];
};

const matchesLanguageCode = (candidate: string, expected: string) => {
	const normalizedCandidate = candidate.toLowerCase();
	const normalizedExpected = expected.toLowerCase();

	return (
		normalizedCandidate === normalizedExpected ||
		normalizedCandidate.startsWith(`${normalizedExpected}-`)
	);
};

export const getLocalizedFlavorText = (
	speciesData: PokemonSpecies | undefined,
	language: SupportedLanguage,
) => {
	if (!speciesData) return '--';

	const preferredCodes = getLanguageCodes(language);
	const localizedEntry = speciesData.flavor_text_entries.find(entry =>
		preferredCodes.some(code => matchesLanguageCode(entry.language.name, code)),
	);
	if (localizedEntry?.flavor_text) return localizedEntry.flavor_text;

	return (
		speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text ?? '--'
	);
};

export const getLocalizedGenus = (
	speciesData: PokemonSpecies | undefined,
	language: SupportedLanguage,
) => {
	if (!speciesData) return '--';

	const preferredCodes = getLanguageCodes(language);
	const localizedEntry = speciesData.genera.find(entry =>
		preferredCodes.some(code => matchesLanguageCode(entry.language.name, code)),
	);
	if (localizedEntry?.genus) return localizedEntry.genus;

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

const formatAbilities = (
	abilities: PokemonDetails['abilities'] | undefined,
	hiddenAbilitySuffix: string,
) => {
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
			hiddenAbilities.length > 0
				? `${hiddenAbilities.join(', ')}${hiddenAbilitySuffix}`
				: undefined,
	};
};

const buildPokedexSectionRows = ({
	damageRelationsByType,
	language,
	pokemonDetails,
	speciesData,
	translate,
}: BuildPokemonAboutDataArgs): PokemonAboutRow[] => {
	const height = formatHeight(pokemonDetails?.height, translate('about.metersUnit'));
	const weight = formatWeight(
		pokemonDetails?.weight,
		translate('about.kgUnit'),
		translate('about.lbsUnit'),
	);
	const abilities = formatAbilities(
		pokemonDetails?.abilities,
		translate('about.hiddenAbilitySuffix'),
	);

	const pokemonTypes = (pokemonDetails?.types ?? [])
		.map(typeEntry => typeEntry.type.name.toLowerCase())
		.filter(isPokemonType);

	return [
		{
			kind: 'text',
			label: translate('about.labels.species'),
			value: getLocalizedGenus(speciesData, language),
		},
		{
			kind: 'textWithSecondary',
			label: translate('about.labels.height'),
			secondaryMode: 'inline',
			value: height.primary,
			secondaryValue: height.secondary,
		},
		{
			kind: 'textWithSecondary',
			label: translate('about.labels.weight'),
			secondaryMode: 'inline',
			value: weight.primary,
			secondaryValue: weight.secondary,
		},
		{
			kind: 'textWithSecondary',
			label: translate('about.labels.abilities'),
			secondaryMode: 'block',
			value: abilities.primary,
			secondaryValue: abilities.secondary,
		},
		{
			kind: 'weaknessBadges',
			label: translate('about.labels.weaknesses'),
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
	translate,
}: BuildPokemonAboutDataArgs): PokemonAboutRow[] => [
	{
		kind: 'text',
		label: translate('about.labels.evYield'),
		value: formatEvYield(pokemonDetails?.stats),
	},
	{
		kind: 'text',
		label: translate('about.labels.catchRate'),
		value: speciesData?.capture_rate?.toString() ?? '--',
	},
	{
		kind: 'text',
		label: translate('about.labels.baseFriendship'),
		value: speciesData?.base_happiness?.toString() ?? '--',
	},
	{
		kind: 'text',
		label: translate('about.labels.baseExp'),
		value: pokemonDetails?.base_experience?.toString() ?? '--',
	},
	{
		kind: 'text',
		label: translate('about.labels.growthRate'),
		value: humanizePokemonName(speciesData?.growth_rate?.name),
	},
];

const buildBreedingSectionRows = ({
	speciesData,
	translate,
}: BuildPokemonAboutDataArgs): PokemonAboutRow[] => {
	const genderRatio = formatGenderRatio(speciesData?.gender_rate);

	return [
		genderRatio
			? {
					kind: 'genderSplit',
					label: translate('about.labels.gender'),
					femaleValue: genderRatio.female,
					maleValue: genderRatio.male,
				}
			: {
					kind: 'text',
					label: translate('about.labels.gender'),
					value: '--',
				},
		{
			kind: 'text',
			label: translate('about.labels.eggGroups'),
			value:
				speciesData?.egg_groups?.map(group => humanizePokemonName(group.name)).join(', ') || '--',
		},
		{
			kind: 'text',
			label: translate('about.labels.eggCycles'),
			value: speciesData?.hatch_counter?.toString() ?? '--',
		},
	];
};

export const buildPokemonAboutData = ({
	damageRelationsByType,
	language,
	pokemonDetails,
	speciesData,
	translate,
}: BuildPokemonAboutDataArgs): PokemonAboutData => ({
	description: normalizeFlavorText(getLocalizedFlavorText(speciesData, language)),
	sections: [
		{
			rows: buildPokedexSectionRows({
				damageRelationsByType,
				language,
				pokemonDetails,
				speciesData,
				translate,
			}),
			title: translate('about.sections.pokedexData'),
		},
		{
			rows: buildTrainingSectionRows({
				damageRelationsByType,
				language,
				pokemonDetails,
				speciesData,
				translate,
			}),
			title: translate('about.sections.training'),
		},
		{
			rows: buildBreedingSectionRows({
				damageRelationsByType,
				language,
				pokemonDetails,
				speciesData,
				translate,
			}),
			title: translate('about.sections.breeding'),
		},
		{
			rows: formatLocationRows(pokemonDetails?.game_indices),
			title: translate('about.sections.location'),
		},
	],
});
