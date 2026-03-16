// @ts-nocheck
import { render } from '@testing-library/react-native';

import { InitialSignInForm } from './InitialSignInForm';

const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
	useRouter: () => ({
		replace: mockReplace,
	}),
}));

jest.mock('@clerk/clerk-expo', () => ({
	useClerk: () => ({
		__unstable__environment: {
			userSettings: {
				attributes: {
					email_address: {
						enabled: true,
						used_for_first_factor: true,
					},
					username: {
						enabled: false,
						used_for_first_factor: false,
					},
				},
			},
		},
	}),
	useSignIn: () => ({
		isLoaded: true,
		signIn: {
			create: jest.fn(),
		},
	}),
}));

jest.mock('@hooks/usePrimaryFontFamily', () => ({
	usePrimaryFontFamily: () => 'FingerPaint_400Regular',
}));

jest.mock('@components/common/Dots', () => ({
	__esModule: true,
	default: () => null,
}));

jest.mock('../components/OAuthButtonRow', () => ({
	__esModule: true,
	default: ({ dividerTitle, variant }: { dividerTitle: string; variant: string }) => {
		const React = require('react');
		const { Text } = require('react-native');

		return React.createElement(
			React.Fragment,
			null,
			React.createElement(Text, null, variant === 'app' ? 'oauth-row-app' : 'oauth-row-clerk'),
			React.createElement(Text, null, dividerTitle),
		);
	},
}));

jest.mock('../components/ErrorText', () => ({
	__esModule: true,
	default: ({ message }: { message: string }) => {
		const React = require('react');
		const { Text } = require('react-native');

		return message ? React.createElement(Text, null, message) : null;
	},
}));

jest.mock('@components/common/CustomButton', () => ({
	__esModule: true,
	default: ({ label }: { label: string }) => {
		const React = require('react');
		const { Text } = require('react-native');

		return React.createElement(Text, null, label);
	},
}));

describe('InitialSignInForm', () => {
	it('renders localized app-style copy and controls', () => {
		const { getByText } = render(
			<InitialSignInForm
				onSetFirstFactor={jest.fn()}
				onSetSupportedFirstFactors={jest.fn()}
			/>,
		);

		expect(getByText('Sign In to Pokédex')).toBeTruthy();
		expect(getByText('Welcome back! Please sign in to continue')).toBeTruthy();
		expect(getByText('oauth-row-app')).toBeTruthy();
		expect(getByText('or')).toBeTruthy();
		expect(getByText('Continue')).toBeTruthy();
		expect(getByText(/Don't have an account\?/)).toBeTruthy();
		expect(getByText('Sign up')).toBeTruthy();
		expect(getByText('Email address')).toBeTruthy();
	});
});
