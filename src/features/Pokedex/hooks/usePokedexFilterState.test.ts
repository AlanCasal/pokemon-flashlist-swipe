// @ts-nocheck
import {
	cloneFilterState,
	createDefaultFilterState,
	getNextAppliedFiltersByMode,
} from './usePokedexFilterState';

describe('usePokedexFilterState helpers', () => {
	it('creates an isolated clone for filter draft state', () => {
		const original = createDefaultFilterState();
		const cloned = cloneFilterState(original);

		cloned.selectedTypes.push('fire');
		cloned.numberRange.min = 10;

		expect(original.selectedTypes).toEqual([]);
		expect(original.numberRange.min).toBe(1);
	});

	it('applies the current draft only for the active mode', () => {
		const allFilters = createDefaultFilterState();
		const savedFilters = createDefaultFilterState();
		savedFilters.selectedTypes = ['water'];

		const next = getNextAppliedFiltersByMode({
			currentMode: 'saved',
			draftFilterState: {
				...createDefaultFilterState(),
				selectedTypes: ['fire'],
				numberRange: { min: 10, max: 1118 },
			},
			previousFiltersByMode: {
				all: allFilters,
				saved: savedFilters,
			},
		});

		expect(next.all).toBe(allFilters);
		expect(next.saved.selectedTypes).toEqual(['fire']);
		expect(next.saved.numberRange).toEqual({ min: 10, max: 1118 });
	});
});
