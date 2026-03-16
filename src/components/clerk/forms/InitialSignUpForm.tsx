import { useSignUp } from '@clerk/clerk-expo';
import CustomButton from '@components/common/CustomButton';
import { textColor, typeColors } from '@constants/colors';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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

interface Props {
	onContinue: (emailAddress: string) => void;
	scheme?: string;
	signInUrl?: string;
}

function InitialSignUpForm({ onContinue, scheme = 'catalyst://', signInUrl = '/(auth)' }: Props) {
	const router = Router.useRouter();
	const { signUp, isLoaded } = useSignUp();
	const { t } = useTranslation();
	const [errorMessage, setErrorMessage] = useState('');
	const [erroredParams, setErroredParams] = useState<string[]>([]);
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');

	async function onContinuePressed() {
		if (!isLoaded || !signUp) {
			return;
		}

		try {
			await signUp.create({
				emailAddress,
				password,
			});
			await signUp.prepareEmailAddressVerification({
				strategy: 'email_code',
			});
			onContinue(emailAddress);
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2));
			setErrorMessage(err.errors[0].message);
			setErroredParams(err.errors.map((error: any) => error.meta.paramName));
		}
	}

	return (
		<InitialAuthShell
			title={t('auth.signUpTitle')}
			subtitle={t('auth.signUpSubtitle')}
			footer={
				<View style={styles.switchModeButton}>
					<View style={styles.switchModeRow}>
						<Text style={styles.switchModeText}>{t('auth.signUpSwitchPrefix').trim()}</Text>
						<Pressable
							accessibilityRole='button'
							onPress={() => router.replace(signInUrl)}
							style={({ pressed }) => [styles.switchModeActionButton, pressed && styles.pressedButton]}
						>
							<Text style={styles.switchModeActionText}>{t('auth.signUpSwitchAction')}</Text>
						</Pressable>
					</View>
				</View>
			}
		>
			<OAuthButtonRow
				scheme={scheme}
				showDivider
				dividerTitle={t('auth.orLabel')}
				variant='app'
			/>

			<Input
				label={t('auth.emailAddressLabel')}
				autoCapitalize='none'
				value={emailAddress}
				onChangeText={setEmailAddress}
				placeholder={t('auth.emailAddressPlaceholder')}
				paramName='email_address'
				error={erroredParams.includes('email_address') ? errorMessage : undefined}
				variant='app'
			/>
			<Input
				label={t('auth.passwordLabel')}
				value={password}
				secureTextEntry
				onChangeText={setPassword}
				placeholder={t('auth.passwordPlaceholder')}
				paramName='password'
				error={erroredParams.includes('password') ? errorMessage : undefined}
				variant='app'
			/>

			<ErrorText message={errorMessage} />

			<CustomButton
				onPress={onContinuePressed}
				disabled={!emailAddress || !password}
				label={t('auth.continueButton')}
				style={styles.continueButton}
			/>
		</InitialAuthShell>
	);
}

export default InitialSignUpForm;

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
	switchModeRow: {
		alignItems: 'center',
		columnGap: 4,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	switchModeActionButton: {
		backgroundColor: 'transparent',
	},
	switchModeActionText: {
		color: typeColors.electric,
		fontSize: 16,
		fontWeight: '700',
	},
	pressedButton: {
		opacity: 0.7,
	},
});
