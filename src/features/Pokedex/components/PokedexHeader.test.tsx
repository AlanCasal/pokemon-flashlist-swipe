// @ts-nocheck
import { getNextSingleSelectOption, shouldShowClearSearchButton } from '../helpers';
import { PokedexHeaderActionId } from '../types';
import { getActionBadgeTestIds } from './PokedexHeader/helpers';

describe('PokedexHeader clear button', () => {
	it('hides clear button for empty input', () => {
		expect(shouldShowClearSearchButton('')).toBe(false);
	});

	it('shows clear button for non-empty input', () => {
		expect(shouldShowClearSearchButton('ditto')).toBe(true);
	});
});

describe('PokedexHeader badge visibility', () => {
	it('shows sort badge ids when sort is active', () => {
		expect(
			getActionBadgeTestIds({
				id: PokedexHeaderActionId.Sort,
				hasActiveSort: true,
				hasActiveGeneration: false,
			}),
		).toEqual({
			containerTestID: 'pokedex-sort-badge',
			labelTestID: 'pokedex-sort-badge-label',
		});
	});

	it('shows generation badge ids when generation is active', () => {
		expect(
			getActionBadgeTestIds({
				id: PokedexHeaderActionId.Generation,
				hasActiveSort: false,
				hasActiveGeneration: true,
			}),
		).toEqual({
			containerTestID: 'pokedex-generation-badge',
			labelTestID: 'pokedex-generation-badge-label',
		});
	});

	it('hides generation badge after selecting the same option again', () => {
		const nextOption = getNextSingleSelectOption('generation_3', 'generation_3');

		expect(nextOption).toBeNull();
		expect(
			getActionBadgeTestIds({
				id: PokedexHeaderActionId.Generation,
				hasActiveSort: false,
				hasActiveGeneration: Boolean(nextOption),
			}),
		).toBeNull();
	});
});
