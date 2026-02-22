import type { PokedexFilterNumberRange } from '../../types';

interface GetNextRangeFromInputParams {
	draftRange: PokedexFilterNumberRange;
	numberRangeDefaults: PokedexFilterNumberRange;
	rawValue: string;
}

export const sanitizeNumericValue = (value: string) => value.replace(/[^0-9]/g, '');

export const clampNumber = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

export const getNextRangeFromMinInput = ({
	draftRange,
	numberRangeDefaults,
	rawValue,
}: GetNextRangeFromInputParams): PokedexFilterNumberRange | null => {
	const sanitizedValue = sanitizeNumericValue(rawValue);
	if (!sanitizedValue) return null;

	const parsedMinValue = Number(sanitizedValue);

	return {
		min: clampNumber(parsedMinValue, numberRangeDefaults.min, draftRange.max),
		max: draftRange.max,
	};
};

export const getNextRangeFromMaxInput = ({
	draftRange,
	numberRangeDefaults,
	rawValue,
}: GetNextRangeFromInputParams): PokedexFilterNumberRange | null => {
	const sanitizedValue = sanitizeNumericValue(rawValue);
	if (!sanitizedValue) return null;

	const parsedMaxValue = Number(sanitizedValue);

	return {
		min: draftRange.min,
		max: clampNumber(parsedMaxValue, draftRange.min, numberRangeDefaults.max),
	};
};
