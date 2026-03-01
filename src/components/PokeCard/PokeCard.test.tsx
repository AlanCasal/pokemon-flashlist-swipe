// @ts-nocheck
import usePokemonDetails from '@hooks/usePokemonDetails';
import { render } from '@testing-library/react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import PokeCard from './PokeCard';

jest.mock('@hooks/usePokemonDetails');
jest.mock('@store/savedStore', () => ({
	useIsPokemonSaved: jest.fn(() => false),
	useToggleSavedPokemon: jest.fn(() => jest.fn()),
}));
jest.mock('@store/toastStore', () => ({
	useShowToast: jest.fn(() => jest.fn()),
}));
jest.mock('expo-router', () => ({
	Link: ({ children }: { children: React.ReactNode }) => children,
}));
jest.mock('@assets/images/dots-big.svg', () => ({
	__esModule: true,
	default: () => null,
}));
jest.mock('moti', () => {
	const { View } = jest.requireActual('react-native');

	return {
		MotiView: View,
	};
});
jest.mock('./Info', () => ({
	__esModule: true,
	default: () => null,
}));
jest.mock('@components/common/PokemonAvatar', () => ({
	__esModule: true,
	default: () => null,
}));

const mockUsePokemonDetails = usePokemonDetails as jest.MockedFunction<typeof usePokemonDetails>;

const pokemonMock = {
	id: 25,
	name: 'pikachu',
	types: [{ type: { name: 'electric' } }],
	sprites: {
		other: {
			'official-artwork': {
				front_default: 'https://img.pokemon/pikachu.png',
			},
		},
	},
};

describe('PokeCard', () => {
	it('renders a centered spinner fallback while details are loading', () => {
		mockUsePokemonDetails.mockReturnValue({
			data: undefined,
			isLoading: true,
			isError: false,
			error: null,
		});

		const {
			getByTestId,
			UNSAFE_getByType: unsafeGetByType,
			UNSAFE_queryByType: unsafeQueryByType,
		} = render(<PokeCard url='https://pokeapi.co/api/v2/pokemon/25/' />);

		expect(getByTestId('poke-card-loading')).toBeTruthy();
		expect(unsafeGetByType(ActivityIndicator)).toBeTruthy();
		expect(unsafeQueryByType(TouchableOpacity)).toBeNull();
	});

	it('renders an error fallback with the query message when details request fails', () => {
		mockUsePokemonDetails.mockReturnValue({
			data: undefined,
			isLoading: false,
			isError: true,
			error: new Error('Request failed with status 500'),
		});

		const {
			getByTestId,
			getByText,
			UNSAFE_queryByType: unsafeQueryByType,
		} = render(<PokeCard url='https://pokeapi.co/api/v2/pokemon/25/' />);

		expect(getByTestId('poke-card-error')).toBeTruthy();
		expect(getByText('Request failed with status 500')).toBeTruthy();
		expect(unsafeQueryByType(TouchableOpacity)).toBeNull();
	});

	it('renders card content when request succeeds', () => {
		mockUsePokemonDetails.mockReturnValue({
			data: pokemonMock,
			isLoading: false,
			isError: false,
			error: null,
		});

		const { UNSAFE_getByType: unsafeGetByType } = render(
			<PokeCard url='https://pokeapi.co/api/v2/pokemon/25/' />,
		);

		expect(unsafeGetByType(TouchableOpacity)).toBeTruthy();
	});
});
