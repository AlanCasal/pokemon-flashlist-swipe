import { useClerk, useSignIn } from '@clerk/clerk-expo';
import { EnvironmentResource, SignInFirstFactor } from '@clerk/types';
import CustomButton from '@components/common/CustomButton';
import { textColor, typeColors } from '@constants/colors';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import ErrorText from '../components/ErrorText';
import InitialAuthShell from '../components/InitialAuthShell';
import Input from '../components/Input';
import OAuthButtonRow from '../components/OAuthButtonRow';

// Safely import expo-router
let Router: any = { useRouter: () => ({ replace: () => {} }) };
try {
	Router = require('expo-router');
} catch (error) {
	console.warn('expo-router import failed:', error);
}

interface InitialSignInFormProps {
	onSetFirstFactor: (firstFactor: SignInFirstFactor, identifier: string) => void;
	onSetSupportedFirstFactors: (firstFactors: SignInFirstFactor[]) => void;
	scheme?: string;
	signUpUrl?: string;
	onSessionAlreadyExists?: () => void;
}

export function InitialSignInForm({
	onSetFirstFactor,
	onSetSupportedFirstFactors,
	scheme = 'catalyst://',
	signUpUrl = '/(auth)/sign-up',
	onSessionAlreadyExists,
}: InitialSignInFormProps) {
	const router = Router.useRouter();
	const { signIn, isLoaded } = useSignIn();
	const clerk = useClerk();
	const { t } = useTranslation();

	const [errorMessage, setErrorMessage] = useState('');
	const [erroredParams, setErroredParams] = useState<string[]>([]);
	const [identifier, setIdentifier] = useState('');
	const [identifierLabel, setIdentifierLabel] = useState(t('auth.emailAddressLabel'));
	const [identifierPlaceholder, setIdentifierPlaceholder] = useState(
		t('auth.emailAddressPlaceholder'),
	);

	// @ts-ignore
	const environment = clerk.__unstable__environment as EnvironmentResource;

	useEffect(() => {
		if (!environment) {
			return;
		}

		const isEmailEnabled =
			environment?.userSettings?.attributes?.email_address?.enabled &&
			environment?.userSettings?.attributes?.email_address?.used_for_first_factor;
		const isUsernameEnabled =
			environment?.userSettings?.attributes?.username?.enabled &&
			environment?.userSettings?.attributes?.username?.used_for_first_factor;

		if (isEmailEnabled && isUsernameEnabled) {
			setIdentifierLabel(t('auth.emailAddressOrUsernameLabel'));
			setIdentifierPlaceholder(t('auth.emailAddressOrUsernamePlaceholder'));
		} else if (isEmailEnabled) {
			setIdentifierLabel(t('auth.emailAddressLabel'));
			setIdentifierPlaceholder(t('auth.emailAddressPlaceholder'));
		} else if (isUsernameEnabled) {
			setIdentifierLabel(t('auth.usernameLabel'));
			setIdentifierPlaceholder(t('auth.usernamePlaceholder'));
		}
	}, [environment, t]);

	async function onContinuePressed() {
		setErrorMessage('');
		if (!isLoaded || !signIn) {
			return;
		}

		try {
			const signInAttempt = await signIn.create({
				identifier,
			});

			const { supportedFirstFactors } = signInAttempt;
			if (!supportedFirstFactors) {
				throw new Error('No supported first factors');
			}

			// @ts-ignore TODO: Fix this type issue
			const firstFactor = determineFirstFactor(supportedFirstFactors);
			if (
				firstFactor.strategy === 'email_code' ||
				firstFactor.strategy === 'reset_password_email_code'
			) {
				await signInAttempt.prepareFirstFactor({
					// @ts-ignore
					strategy: firstFactor.strategy,
					// @ts-ignore
					emailAddressId: firstFactor.emailAddressId,
				});
			}
			onSetFirstFactor(firstFactor, identifier);
			// @ts-ignore TODO: Fix this type issue
			onSetSupportedFirstFactors(supportedFirstFactors);
		} catch (err: any) {
			const { errors } = err;
			if (errors[0].code === 'session_exists') {
				onSessionAlreadyExists?.();
				return;
			}
			console.error('signInError', JSON.stringify(err, null, 2));
			setErrorMessage(errors[0].message);
			setErroredParams(errors.map((e: any) => e?.meta?.paramName));
		}
	}

	function determineFirstFactor(supportedFirstFactors: SignInFirstFactor[]): SignInFirstFactor {
		return supportedFirstFactors[0];
	}

	return (
		<InitialAuthShell
			title={t('auth.signInTitle')}
			subtitle={t('auth.signInSubtitle')}
			footer={
				<TouchableOpacity
					onPress={() => router.replace(signUpUrl)}
					style={styles.switchModeButton}
				>
					<Text style={styles.switchModeText}>
						{t('auth.signInSwitchPrefix')}
						<Text style={styles.switchModeActionText}>{t('auth.signInSwitchAction')}</Text>
					</Text>
				</TouchableOpacity>
			}
		>
			<OAuthButtonRow
				scheme={scheme}
				showDivider
				dividerTitle={t('auth.orLabel')}
				variant='app'
			/>

			<Input
				label={identifierLabel}
				autoCapitalize='none'
				value={identifier}
				onChangeText={setIdentifier}
				placeholder={identifierPlaceholder}
				paramName='identifier'
				error={erroredParams.includes('identifier') ? errorMessage : undefined}
				variant='app'
			/>

			<ErrorText message={errorMessage} />

			<CustomButton
				onPress={onContinuePressed}
				disabled={!identifier}
				label={t('auth.continueButton')}
				style={styles.continueButton}
			/>
		</InitialAuthShell>
	);
}

export default InitialSignInForm;

const styles = StyleSheet.create({
	continueButton: {
		width: '100%',
	},
	switchModeButton: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 8,
	},
	switchModeText: {
		color: textColor.light,
		fontSize: 16,
		textAlign: 'center',
	},
	switchModeActionText: {
		color: typeColors.electric,
		fontSize: 16,
		fontWeight: '700',
	},
});
