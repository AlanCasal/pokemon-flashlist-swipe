// @ts-nocheck
import {
	formatPokemonName,
	formatPokemonNumber,
	getPrimaryTypeFromParam,
	getRouteParamValue,
} from './helpers';

describe('EvolutionChart helpers', () => {
	it('returns normalized route params for string values', () => {
		expect(getRouteParamValue(' 25 ')).toBe('25');
	});

	it('returns the first normalized route param when value is an array', () => {
		expect(getRouteParamValue(['  fire ', 'water'])).toBe('fire');
	});

	it('falls back to dark when route type is invalid', () => {
		expect(getPrimaryTypeFromParam('unknown-type')).toBe('dark');
	});

	it('formats pokemon numbers with leading zeros', () => {
		expect(formatPokemonNumber(4)).toBe('#004');
	});

	it('returns placeholder number when pokemon id is missing', () => {
		expect(formatPokemonNumber(undefined)).toBe('--');
	});

	it('formats pokemon names with uppercase first letter', () => {
		expect(formatPokemonName('charmander')).toBe('Charmander');
	});
});
