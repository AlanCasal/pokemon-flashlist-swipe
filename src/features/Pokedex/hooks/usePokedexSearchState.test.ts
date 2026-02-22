// @ts-nocheck
import { getNextSearchValues } from './usePokedexSearchState';

describe('usePokedexSearchState helpers', () => {
	it('updates all mode search value', () => {
		expect(
			getNextSearchValues({
				currentValues: { allSearchValue: '', savedSearchValue: 'ditto' },
				isSavedMode: false,
				nextValue: 'char',
			}),
		).toEqual({ allSearchValue: 'char', savedSearchValue: 'ditto' });
	});

	it('updates saved mode search value', () => {
		expect(
			getNextSearchValues({
				currentValues: { allSearchValue: 'char', savedSearchValue: '' },
				isSavedMode: true,
				nextValue: 'ditto',
			}),
		).toEqual({ allSearchValue: 'char', savedSearchValue: 'ditto' });
	});

	it('clears only active mode search value', () => {
		expect(
			getNextSearchValues({
				currentValues: { allSearchValue: 'char', savedSearchValue: 'ditto' },
				isSavedMode: true,
				nextValue: '',
			}),
		).toEqual({ allSearchValue: 'char', savedSearchValue: '' });
	});
});
