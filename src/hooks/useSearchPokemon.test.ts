// @ts-nocheck
import { API_URL } from '@constants/api';
import { useQuery } from '@tanstack/react-query';
import { fetchJson } from '@utils/helpers';

import { normalizeSearchTerm, useSearchPokemon } from './useSearchPokemon';

jest.mock('@tanstack/react-query', () => ({
	useQuery: jest.fn(),
}));

jest.mock('@utils/helpers', () => ({
	fetchJson: jest.fn(),
}));

describe('useSearchPokemon', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('normalizes the search term', () => {
		expect(normalizeSearchTerm('  DitTo  ')).toBe('ditto');
	});

	it('does not run query when hook is disabled', () => {
		(useQuery as jest.Mock).mockReturnValue({});

		useSearchPokemon('ditto', false);

		expect(useQuery).toHaveBeenCalledWith(
			expect.objectContaining({
				queryKey: ['pokemonSearch', 'ditto'],
				enabled: false,
				retry: false,
			}),
		);
	});

	it('builds API URL using normalized term', () => {
		(fetchJson as jest.Mock).mockResolvedValue({});
		(useQuery as jest.Mock).mockImplementation(({ queryFn }) => {
			void queryFn();
			return {};
		});

		useSearchPokemon('  Ditto ', true);

		expect(fetchJson).toHaveBeenCalledWith(`${API_URL}/ditto`);
	});
});
