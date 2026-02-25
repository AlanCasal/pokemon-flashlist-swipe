// @ts-nocheck
import {
	formatGenderRatio,
	formatHeight,
	formatWeight,
	getTypeWeaknesses,
	groupGameIndices,
	normalizeFlavorText,
} from './helpers';

const getEmptyDamageRelations = () => ({
	damage_relations: {
		double_damage_from: [],
		half_damage_from: [],
		no_damage_from: [],
	},
});

describe('PokemonAbout helpers', () => {
	it('normalizes flavor text line breaks and spacing', () => {
		expect(normalizeFlavorText('Line 1\nLine 2\fLine 3')).toBe('Line 1 Line 2 Line 3');
	});

	it('formats height with metric and imperial values', () => {
		expect(formatHeight(6)).toEqual({
			primary: '0.6m',
			secondary: `(2'00")`,
		});
	});

	it('formats weight with metric and imperial values', () => {
		expect(formatWeight(85)).toEqual({
			primary: '8.5kg',
			secondary: '(18.7 lbs)',
		});
	});

	it('derives weaknesses for single type', () => {
		const fireRelations = getEmptyDamageRelations();
		fireRelations.damage_relations.double_damage_from = [
			{ name: 'water' },
			{ name: 'ground' },
			{ name: 'rock' },
		];

		expect(
			getTypeWeaknesses({
				damageRelationsByType: { fire: fireRelations },
				pokemonTypes: ['fire'],
			}).map(item => item.type),
		).toEqual(['ground', 'rock', 'water']);
	});

	it('derives weaknesses for dual type by combining multipliers', () => {
		const fireRelations = getEmptyDamageRelations();
		fireRelations.damage_relations.double_damage_from = [
			{ name: 'ground' },
			{ name: 'rock' },
			{ name: 'water' },
		];
		fireRelations.damage_relations.half_damage_from = [
			{ name: 'bug' },
			{ name: 'fire' },
			{ name: 'grass' },
		];

		const flyingRelations = getEmptyDamageRelations();
		flyingRelations.damage_relations.double_damage_from = [
			{ name: 'electric' },
			{ name: 'rock' },
			{ name: 'ice' },
		];
		flyingRelations.damage_relations.half_damage_from = [
			{ name: 'grass' },
			{ name: 'fighting' },
			{ name: 'bug' },
		];
		flyingRelations.damage_relations.no_damage_from = [{ name: 'ground' }];

		const weaknesses = getTypeWeaknesses({
			damageRelationsByType: {
				fire: fireRelations,
				flying: flyingRelations,
			},
			pokemonTypes: ['fire', 'flying'],
		});

		expect(weaknesses[0]).toMatchObject({ type: 'rock', multiplier: 4 });
		expect(weaknesses.map(item => item.type)).toEqual(['rock', 'electric', 'ice', 'water']);
	});

	it('groups game indices by shared index', () => {
		expect(
			groupGameIndices([
				{ game_index: 4, version: { name: 'red' } },
				{ game_index: 4, version: { name: 'blue' } },
				{ game_index: 4, version: { name: 'yellow' } },
				{ game_index: 229, version: { name: 'gold' } },
				{ game_index: 229, version: { name: 'silver' } },
			]),
		).toEqual([
			{
				index: 4,
				versions: ['red', 'blue', 'yellow'],
			},
			{
				index: 229,
				versions: ['gold', 'silver'],
			},
		]);
	});

	it('formats standard gender ratio', () => {
		expect(formatGenderRatio(1)).toEqual({
			female: '12.5%',
			male: '87.5%',
		});
	});

	it('returns null for genderless pokemon', () => {
		expect(formatGenderRatio(-1)).toBeNull();
	});
});
