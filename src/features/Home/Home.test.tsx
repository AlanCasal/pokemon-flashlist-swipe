// @ts-nocheck
import { render } from '@testing-library/react-native';

import Home from './Home';

const mockUseAuth = jest.fn();
const mockUsePokemonSprites = jest.fn();

jest.mock('@clerk/clerk-expo', () => ({
	useAuth: () => mockUseAuth(),
}));
jest.mock('@components/Menu', () => ({
	__esModule: true,
	default: ({ showSignOut }: { showSignOut: boolean }) => {
		const React = jest.requireActual('react');
		const { Text } = jest.requireActual('react-native');

		return React.createElement(Text, { testID: 'menu-show-sign-out' }, String(showSignOut));
	},
}));
jest.mock('@hooks/usePokemonSprites', () => ({
	__esModule: true,
	default: () => mockUsePokemonSprites(),
}));
jest.mock('@tanstack/react-query', () => ({
	useQueryClient: () => ({
		removeQueries: jest.fn(),
	}),
}));
jest.mock('expo-router', () => ({
	useRouter: () => ({
		push: jest.fn(),
	}),
}));
jest.mock('expo-image', () => ({
	Image: 'Image',
}));
jest.mock('@animatereactnative/marquee', () => ({
	Marquee: 'Marquee',
}));
jest.mock('expo-linear-gradient', () => ({
	LinearGradient: 'LinearGradient',
}));
jest.mock('@assets/images/pokeball-full.svg', () => ({
	__esModule: true,
	default: 'Pokeball',
}));
jest.mock('@components/common/CustomButton', () => ({
	__esModule: true,
	default: ({ label }: { label: string }) => {
		const React = jest.requireActual('react');
		const { Text } = jest.requireActual('react-native');

		return React.createElement(Text, null, label);
	},
}));
jest.mock('react-native-reanimated', () => {
	const React = jest.requireActual('react');

	return {
		__esModule: true,
		default: {
			View: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) =>
				React.createElement('AnimatedView', props, children),
		},
		FadeIn: {
			springify: () => ({
				damping: () => ({
					delay: () => ({
						duration: () => ({}),
					}),
				}),
			}),
		},
	};
});
jest.mock('./useStyles', () => ({
	createSpriteTileStyles: () => ({
		spriteTileBackground: {},
	}),
	useStyles: () => ({
		footer: {},
		loadingContainer: {},
		logo: {},
		marqueeAbsoluteFill: {},
		marqueeColumns: {},
		marqueeRow: {},
		marqueeRowHeight: {},
		root: {},
		spriteImage: {},
		spriteOverlay: {},
		spriteTile: {},
		startButtonWrapper: {},
		subtitle: {},
		topGradient: {},
	}),
}));

describe('Home', () => {
	beforeEach(() => {
		mockUsePokemonSprites.mockReturnValue({
			data: [],
			hasError: false,
			isLoading: true,
		});
	});

	it('keeps sign out hidden when auth has not resolved yet', () => {
		mockUseAuth.mockReturnValue({
			isLoaded: false,
			isSignedIn: undefined,
		});

		const { getByTestId } = render(<Home />);

		expect(getByTestId('menu-show-sign-out').props.children).toBe('false');
	});

	it('shows sign out when the user is signed in', () => {
		mockUseAuth.mockReturnValue({
			isLoaded: true,
			isSignedIn: true,
		});

		const { getByTestId } = render(<Home />);

		expect(getByTestId('menu-show-sign-out').props.children).toBe('true');
	});
});
