// @ts-nocheck
import { shouldShowClearSearchButton } from './helpers';

describe('PokedexHeader clear button', () => {
	it('hides clear button for empty input', () => {
		expect(shouldShowClearSearchButton('')).toBe(false);
	});

	it('shows clear button for non-empty input', () => {
		expect(shouldShowClearSearchButton('ditto')).toBe(true);
	});
});
