// @ts-nocheck
import {
	getNextSelectedPokemonParam,
	getSelectedPokemonName,
	handleEvolutionPokemonPress,
} from '../helpers';

describe('usePokemonController selection helpers', () => {
	it('prefers pokemon details name when deriving selected pokemon', () => {
		expect(
			getSelectedPokemonName({
				pokemonDetailsName: 'Charizard',
				routePokemonId: '6',
			}),
		).toBe('charizard');
	});

	it('derives selected pokemon from non-numeric route id when details are missing', () => {
		expect(
			getSelectedPokemonName({
				pokemonDetailsName: undefined,
				routePokemonId: ' Eevee ',
			}),
		).toBe('eevee');
	});

	it('returns null for numeric route ids when details are missing', () => {
		expect(
			getSelectedPokemonName({
				pokemonDetailsName: undefined,
				routePokemonId: '133',
			}),
		).toBeNull();
	});

	it('normalizes tapped pokemon names and ignores duplicate selection', () => {
		expect(
			getNextSelectedPokemonParam({
				pokemonName: '  Ivysaur ',
				selectedPokemonName: null,
			}),
		).toBe('ivysaur');

		expect(
			getNextSelectedPokemonParam({
				pokemonName: 'Ivysaur',
				selectedPokemonName: 'ivysaur',
			}),
		).toBeNull();
	});
});

describe('handleEvolutionPokemonPress', () => {
	it('calls setParams with normalized pokemon id when tap is valid', () => {
		const setParams = jest.fn();

		handleEvolutionPokemonPress({
			pokemonName: '  Charmeleon ',
			selectedPokemonName: 'charmander',
			setParams,
		});

		expect(setParams).toHaveBeenCalledWith({ id: 'charmeleon' });
		expect(setParams).toHaveBeenCalledTimes(1);
	});

	it('does not call setParams when tap is duplicate or empty', () => {
		const setParams = jest.fn();

		handleEvolutionPokemonPress({
			pokemonName: 'Bulbasaur',
			selectedPokemonName: 'bulbasaur',
			setParams,
		});
		handleEvolutionPokemonPress({
			pokemonName: '   ',
			selectedPokemonName: 'bulbasaur',
			setParams,
		});

		expect(setParams).not.toHaveBeenCalled();
	});
});
