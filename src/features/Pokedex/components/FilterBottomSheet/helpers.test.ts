// @ts-nocheck
import {
	clampNumber,
	getNextRangeFromMaxInput,
	getNextRangeFromMinInput,
	sanitizeNumericValue,
} from './helpers';

describe('FilterBottomSheet helpers', () => {
	it('sanitizes non-numeric characters', () => {
		expect(sanitizeNumericValue('00a1-9')).toBe('0019');
	});

	it('clamps values within limits', () => {
		expect(clampNumber(0, 1, 10)).toBe(1);
		expect(clampNumber(99, 1, 10)).toBe(10);
		expect(clampNumber(5, 1, 10)).toBe(5);
	});

	it('returns null when min input is empty after sanitization', () => {
		expect(
			getNextRangeFromMinInput({
				draftRange: { min: 20, max: 40 },
				numberRangeDefaults: { min: 1, max: 1118 },
				rawValue: '---',
			}),
		).toBeNull();
	});

	it('computes next min range with clamping', () => {
		expect(
			getNextRangeFromMinInput({
				draftRange: { min: 20, max: 40 },
				numberRangeDefaults: { min: 1, max: 1118 },
				rawValue: '200',
			}),
		).toEqual({ min: 40, max: 40 });
	});

	it('computes next max range with clamping', () => {
		expect(
			getNextRangeFromMaxInput({
				draftRange: { min: 20, max: 40 },
				numberRangeDefaults: { min: 1, max: 1118 },
				rawValue: '10',
			}),
		).toEqual({ min: 20, max: 20 });
	});
});
