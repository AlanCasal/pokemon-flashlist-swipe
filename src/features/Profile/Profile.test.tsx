// @ts-nocheck
import { fireEvent, render } from '@testing-library/react-native';

import Profile from './Profile';

const mockUseUser = jest.fn();
const mockUseSavedPokemons = jest.fn();

jest.mock('@clerk/clerk-expo', () => ({
	useUser: () => mockUseUser(),
}));

jest.mock('@store/savedStore', () => ({
	useSavedPokemons: () => mockUseSavedPokemons(),
}));

jest.mock('@components/DetailSheet', () => {
	const React = jest.requireActual('react');
	const { Text, TouchableOpacity, View } = jest.requireActual('react-native');

	return {
		__esModule: true,
		default: ({ activeTab, children, onTabPress, tabConfig }) =>
			React.createElement(
				View,
				{ testID: 'detail-sheet' },
				React.createElement(
					View,
					null,
					tabConfig.map(tab =>
						React.createElement(
							TouchableOpacity,
							{ key: tab.id, onPress: () => onTabPress(tab.id) },
							React.createElement(Text, null, tab.label),
							activeTab === tab.id
								? React.createElement(Text, { testID: `active-tab-${tab.id}` }, 'active')
								: null,
						),
					),
				),
				children,
			),
	};
});

jest.mock('@components/common/BackButton', () => ({
	__esModule: true,
	default: 'BackButton',
}));

jest.mock('@/src/components/common/Dots', () => ({
	__esModule: true,
	default: 'Dots',
}));

jest.mock('@expo/vector-icons', () => ({
	MaterialCommunityIcons: 'MaterialCommunityIcons',
}));

jest.mock('expo-image', () => {
	const React = jest.requireActual('react');

	return {
		Image: props => React.createElement('Image', props),
	};
});

jest.mock('react-native-reanimated', () => {
	const { Text, View } = jest.requireActual('react-native');

	return {
		__esModule: true,
		Extrapolation: { CLAMP: 'clamp' },
		default: {
			Text,
			View,
		},
		interpolate: (_value, _input, output) => output[0],
		useAnimatedStyle: updater => updater(),
		useSharedValue: value => ({ value }),
	};
});

describe('Profile screen', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseSavedPokemons.mockReturnValue([
			'pikachu',
			'charizard',
			'eevee',
			'mew',
			'snorlax',
			'ditto',
		]);
		mockUseUser.mockReturnValue({
			isLoaded: true,
			isSignedIn: true,
			user: {
				createdAt: new Date('2024-01-10T00:00:00.000Z'),
				externalAccounts: [{ id: 'google' }],
				firstName: 'Ash',
				fullName: 'Ash Ketchum',
				imageUrl: 'https://example.com/ash.png',
				lastName: 'Ketchum',
				lastSignInAt: new Date('2024-02-20T00:00:00.000Z'),
				primaryEmailAddress: { emailAddress: 'ash@example.com' },
				username: 'ash',
			},
		});
	});

	it('renders the user hero content and about details from Clerk data', () => {
		const { getByTestId, getByText } = render(<Profile />);

		expect(getByTestId('profile-hero-name')).toHaveTextContent('Ash Ketchum');
		expect(getByTestId('profile-hero-secondary')).toHaveTextContent('@ash');
		expect(getByTestId('profile-hero-avatar').props.source).toEqual({
			uri: 'https://example.com/ash.png',
		});
		expect(getByText('Saved Pokémon')).toBeTruthy();
		expect(getByText('6')).toBeTruthy();
		expect(getByText('Connected accounts')).toBeTruthy();
	});

	it('switches placeholder tabs and shows the localized WIP content', () => {
		const { getAllByText, getByText } = render(<Profile />);

		fireEvent.press(getAllByText('Collection')[0]);
		expect(getByText('WIP')).toBeTruthy();

		fireEvent.press(getAllByText('Badges')[0]);
		expect(getByText('WIP')).toBeTruthy();
	});

	it('does not render email in the header when username is missing', () => {
		mockUseUser.mockReturnValue({
			isLoaded: true,
			isSignedIn: true,
			user: {
				createdAt: new Date('2024-01-10T00:00:00.000Z'),
				externalAccounts: [{ id: 'google' }],
				firstName: 'Ash',
				fullName: 'Ash Ketchum',
				imageUrl: 'https://example.com/ash.png',
				lastName: 'Ketchum',
				lastSignInAt: new Date('2024-02-20T00:00:00.000Z'),
				primaryEmailAddress: { emailAddress: 'ash@example.com' },
				username: null,
			},
		});

		const { queryByTestId } = render(<Profile />);

		expect(queryByTestId('profile-hero-secondary')).toBeNull();
	});
});
