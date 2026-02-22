// @ts-nocheck
import { getNextBottomSheetVisibilityState } from './usePokedexBottomSheetState';

describe('usePokedexBottomSheetState helpers', () => {
	it('opens the requested sheet and preserves others', () => {
		expect(
			getNextBottomSheetVisibilityState({
				id: 'generation',
				isOpen: true,
				previousState: { sort: false, generation: false, filter: true },
			}),
		).toEqual({ sort: false, generation: true, filter: true });
	});

	it('closes the requested sheet', () => {
		expect(
			getNextBottomSheetVisibilityState({
				id: 'filter',
				isOpen: false,
				previousState: { sort: false, generation: true, filter: true },
			}),
		).toEqual({ sort: false, generation: true, filter: false });
	});
});
