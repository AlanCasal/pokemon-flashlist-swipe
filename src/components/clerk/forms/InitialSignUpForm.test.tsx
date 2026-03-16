// @ts-nocheck
import { render } from '@testing-library/react-native';

import InitialSignUpForm from './InitialSignUpForm';

const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
	useRouter: () => ({
		replace: mockReplace,
	}),
}));

jest.mock('@clerk/clerk-expo', () => ({
	useSignUp: () => ({
		isLoaded: true,
		signUp: {
			create: jest.fn(),
			prepareEmailAddressVerification: jest.fn(),
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

describe('InitialSignUpForm', () => {
	it('renders localized app-style copy and controls', () => {
		const { getByText } = render(<InitialSignUpForm onContinue={jest.fn()} />);

		expect(getByText('Sign Up to Pokédex')).toBeTruthy();
		expect(getByText('Create your account to start exploring')).toBeTruthy();
		expect(getByText('oauth-row-app')).toBeTruthy();
		expect(getByText('or')).toBeTruthy();
		expect(getByText('Continue')).toBeTruthy();
		expect(getByText(/Already have an account\?/)).toBeTruthy();
		expect(getByText('Sign in')).toBeTruthy();
		expect(getByText('Email address')).toBeTruthy();
		expect(getByText('Password')).toBeTruthy();
	});
});
