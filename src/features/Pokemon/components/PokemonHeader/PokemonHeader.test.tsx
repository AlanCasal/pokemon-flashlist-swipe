// @ts-nocheck
import { render } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';

import PokemonHeader from './PokemonHeader';
import type { PokemonHeaderProps } from './types';

jest.mock('@expo/vector-icons', () => ({
	MaterialCommunityIcons: 'MaterialCommunityIcons',
}));

jest.mock('react-native-reanimated', () => {
	const { Text, View } = jest.requireActual('react-native');

	return {
		__esModule: true,
		default: { Text, View },
	};
});

jest.mock('@assets/images/dots-small.svg', () => ({ __esModule: true, default: () => null }));
jest.mock('@assets/images/pokeball-full.svg', () => ({ __esModule: true, default: () => null }));

jest.mock('@/src/utils/icons', () => {
	const Stub = () => null;

	return {
		__esModule: true,
		PokemonIconType: {},
		typeIcons: new Proxy({}, { get: () => Stub }),
	};
});

const defaultProps: PokemonHeaderProps = {
	compactTitleStyle: {},
	displayName: 'Charizard',
	formattedId: '#0006',
	heroImageUrl: 'https://img.pokemon/charizard.png',
	heroStyle: {},
	isPokemonLoading: false,
	isSaved: false,
	typeChips: ['fire', 'flying'],
};

const renderHeader = (props: Partial<PokemonHeaderProps> = {}) =>
	render(
		<PokemonHeader
			{...defaultProps}
			{...props}
		/>,
	);

describe('PokemonHeader', () => {
	it('renders the formatted id and display name in the hero block', () => {
		const { getByText, getAllByText } = renderHeader();

		expect(getByText('#0006')).toBeTruthy();
		expect(getAllByText('Charizard').length).toBe(2);
	});

	it('renders a localized chip label for each provided type', () => {
		const { getByText } = renderHeader();

		expect(getByText('Fire')).toBeTruthy();
		expect(getByText('Flying')).toBeTruthy();
	});

	it('does not render the loading indicator when a hero image is provided', () => {
		const { UNSAFE_queryByType: unsafeQueryByType } = renderHeader();

		expect(unsafeQueryByType(ActivityIndicator)).toBeNull();
	});

	it('shows a loading indicator when there is no hero image and the request is in flight', () => {
		const { UNSAFE_getByType: unsafeGetByType } = renderHeader({
			heroImageUrl: null,
			isPokemonLoading: true,
		});

		expect(unsafeGetByType(ActivityIndicator)).toBeTruthy();
	});

	it('omits the loading indicator when there is no hero image and the request is idle', () => {
		const { UNSAFE_queryByType: unsafeQueryByType } = renderHeader({
			heroImageUrl: null,
			isPokemonLoading: false,
		});

		expect(unsafeQueryByType(ActivityIndicator)).toBeNull();
	});

	it('renders no type chip labels when the list is empty', () => {
		const { queryByText } = renderHeader({ typeChips: [] });

		expect(queryByText('Fire')).toBeNull();
		expect(queryByText('Flying')).toBeNull();
	});
});
