// @ts-nocheck
import {
	buildBaseStatRows,
	buildPokemonStatsData,
	buildTypeDefenses,
	formatDefenseMultiplier,
} from './helpers';

const createDamageRelations = () => ({
	damage_relations: {
		double_damage_from: [],
		half_damage_from: [],
		no_damage_from: [],
	},
});

const createPokemonDetails = ({ types = ['fire'] }: { types?: string[] } = {}) =>
	({
		stats: [
			{ base_stat: 39, stat: { name: 'hp' } },
			{ base_stat: 52, stat: { name: 'attack' } },
			{ base_stat: 43, stat: { name: 'defense' } },
			{ base_stat: 60, stat: { name: 'special-attack' } },
			{ base_stat: 50, stat: { name: 'special-defense' } },
			{ base_stat: 65, stat: { name: 'speed' } },
		],
		types: types.map((name, index) => ({ slot: index + 1, type: { name } })),
	}) as any;

describe('Pokemon Stats helpers', () => {
	it('maps base stats in expected order and computes total for Charmander', () => {
		const data = buildPokemonStatsData({
			damageRelationsByType: {},
			pokemonDetails: createPokemonDetails(),
		});

		expect(data.baseStats.map(row => row.label)).toEqual([
			'HP',
			'Attack',
			'Defense',
			'Sp. Atk',
			'Sp. Def',
			'Speed',
		]);
		expect(data.baseStats.map(row => row.value)).toEqual([39, 52, 43, 60, 50, 65]);
		expect(data.totalBaseStat).toBe(309);
	});

	it('uses level 100 formulas for min/max ranges', () => {
		const rows = buildBaseStatRows(createPokemonDetails().stats);
		const hpRow = rows.find(row => row.key === 'hp');
		const attackRow = rows.find(row => row.key === 'attack');

		expect(hpRow).toMatchObject({ min: 188, max: 282 });
		expect(attackRow).toMatchObject({ min: 98, max: 223 });
	});

	it('computes single-type fire defenses and hides neutral multipliers', () => {
		const fireRelations = createDamageRelations();
		fireRelations.damage_relations.double_damage_from = [
			{ name: 'water' },
			{ name: 'ground' },
			{ name: 'rock' },
		];
		fireRelations.damage_relations.half_damage_from = [
			{ name: 'fire' },
			{ name: 'grass' },
			{ name: 'ice' },
			{ name: 'bug' },
			{ name: 'steel' },
			{ name: 'fairy' },
		];

		const defenses = buildTypeDefenses({
			damageRelationsByType: { fire: fireRelations },
			pokemonTypes: ['fire'],
		});

		expect(defenses.find(item => item.type === 'water')).toMatchObject({
			multiplier: 2,
			multiplierLabel: '2',
		});
		expect(defenses.find(item => item.type === 'rock')).toMatchObject({
			multiplier: 2,
			multiplierLabel: '2',
		});
		expect(defenses.find(item => item.type === 'grass')).toMatchObject({
			multiplier: 0.5,
			multiplierLabel: '½',
		});
		expect(defenses.find(item => item.type === 'normal')).toMatchObject({
			multiplier: 1,
			multiplierLabel: '',
		});
	});

	it('combines dual-type multipliers (including 4x and 1/4x)', () => {
		const fireRelations = createDamageRelations();
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

		const flyingRelations = createDamageRelations();
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

		const defenses = buildTypeDefenses({
			damageRelationsByType: {
				fire: fireRelations,
				flying: flyingRelations,
			},
			pokemonTypes: ['fire', 'flying'],
		});

		expect(defenses.find(item => item.type === 'rock')).toMatchObject({
			multiplier: 4,
			multiplierLabel: '4',
		});
		expect(defenses.find(item => item.type === 'bug')).toMatchObject({
			multiplier: 0.25,
			multiplierLabel: '¼',
		});
	});

	it('formats multiplier labels including hidden neutral', () => {
		expect(formatDefenseMultiplier(1)).toBe('');
		expect(formatDefenseMultiplier(0.5)).toBe('½');
		expect(formatDefenseMultiplier(0.25)).toBe('¼');
		expect(formatDefenseMultiplier(2)).toBe('2');
		expect(formatDefenseMultiplier(0)).toBe('0');
	});
});
