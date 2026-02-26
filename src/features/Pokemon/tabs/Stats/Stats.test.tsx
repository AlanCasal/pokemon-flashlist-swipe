// @ts-nocheck
import { render } from '@testing-library/react-native';

import type { PokemonStatsData } from '../../types';
import Stats from './Stats';
import type { PokemonStatsProps } from './types';

jest.mock('@components/PokemonTypeIcon', () => ({
	__esModule: true,
	default: () => null,
}));

const STATS_NOTE =
	'The ranges shown on the right are for a level 100 Pokémon. Maximum values are based on a beneficial nature, 252 EVs, 31 IVs; minimum values are based on a hindering nature, 0 EVs, 0 IVs.';

const buildStatsData = (): PokemonStatsData => ({
	baseStats: [
		{ key: 'hp', label: 'HP', value: 78, min: 266, max: 360, barFillRatio: 0.31 },
		{ key: 'attack', label: 'Attack', value: 84, min: 166, max: 293, barFillRatio: 0.33 },
		{ key: 'defense', label: 'Defense', value: 78, min: 156, max: 282, barFillRatio: 0.31 },
		{ key: 'special-attack', label: 'Sp. Atk', value: 109, min: 211, max: 348, barFillRatio: 0.43 },
		{
			key: 'special-defense',
			label: 'Sp. Def',
			value: 85,
			min: 167,
			max: 295,
			barFillRatio: 0.33,
		},
		{ key: 'speed', label: 'Speed', value: 100, min: 185, max: 328, barFillRatio: 0.39 },
	],
	totalBaseStat: 534,
	typeDefenses: [
		{ type: 'fire', multiplier: 0.5, multiplierLabel: '½' },
		{ type: 'water', multiplier: 2, multiplierLabel: '2' },
		{ type: 'grass', multiplier: 0.5, multiplierLabel: '½' },
	],
});

const defaultProps: PokemonStatsProps = {
	data: undefined,
	displayName: 'Charizard',
	error: null,
	isLoading: false,
	primaryType: 'fire',
};

const renderStats = (props: Partial<PokemonStatsProps> = {}) =>
	render(
		<Stats
			{...defaultProps}
			{...props}
		/>,
	);

describe('Stats', () => {
	it('shows loading content when loading and no data is available', () => {
		const { getByText } = renderStats({ isLoading: true });

		expect(getByText('Loading stats data...')).toBeTruthy();
	});

	it('shows error content when request fails and no data is available', () => {
		const { getByText } = renderStats({
			error: new Error('Request failed'),
		});

		expect(getByText('Could not load stats data right now.')).toBeTruthy();
	});

	it('shows empty fallback when stats are unavailable', () => {
		const { getByText } = renderStats();

		expect(getByText('Stats are not available right now.')).toBeTruthy();
	});

	it('shows populated content with section titles, total row, note, and defense description', () => {
		const { getByText } = renderStats({
			data: buildStatsData(),
			displayName: 'Charizard',
		});

		expect(getByText('Base Stats')).toBeTruthy();
		expect(getByText('Type Defenses')).toBeTruthy();
		expect(getByText('Total')).toBeTruthy();
		expect(getByText('Min')).toBeTruthy();
		expect(getByText('Max')).toBeTruthy();
		expect(getByText('534')).toBeTruthy();
		expect(getByText(STATS_NOTE)).toBeTruthy();
		expect(getByText('The effectiveness of each type on Charizard.')).toBeTruthy();
	});

	it('uses the fallback Pokémon name when display name is unavailable', () => {
		const { getByText } = renderStats({
			data: buildStatsData(),
			displayName: '--',
		});

		expect(getByText('The effectiveness of each type on this Pokémon.')).toBeTruthy();
	});

	it('renders non-neutral defense multipliers', () => {
		const { getAllByText, getByText } = renderStats({
			data: buildStatsData(),
		});

		expect(getByText('2')).toBeTruthy();
		expect(getAllByText('½').length).toBeGreaterThan(0);
	});
});
