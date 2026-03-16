import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import CharmanderLoading from '@components/common/CharmanderLoading';
import { FingerPaint_400Regular, useFonts } from '@expo-google-fonts/finger-paint';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import i18n from '@/src/i18n';
import { useResolvedLanguage } from '@/src/store/languageStore';

import Toast from '../components/Toast/Toast';

const queryClient = new QueryClient();

const styles = StyleSheet.create({
	gestureRoot: {
		flex: 1,
	},
	loadingContainer: {
		alignItems: 'center',
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'center',
	},
});

const RootLayoutWithAuth = () => {
	const { isSignedIn, isLoaded } = useAuth();

	if (!isLoaded) return <CharmanderLoading />;

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Protected guard={isSignedIn}>
				<Stack.Screen
					name='details'
					options={{ animation: 'fade' }}
				/>
			</Stack.Protected>

			<Stack.Protected guard={!isSignedIn}>
				<Stack.Screen
					name='home'
					options={{ animation: 'fade' }}
				/>
			</Stack.Protected>
		</Stack>
	);
};

const RootLayout = () => {
	const [fontsLoaded, fontError] = useFonts({ FingerPaint_400Regular });
	const resolvedLanguage = useResolvedLanguage();

	useEffect(() => {
		void i18n.changeLanguage(resolvedLanguage);
	}, [resolvedLanguage]);

	const isAppReady = fontsLoaded || Boolean(fontError);
	if (!isAppReady) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView style={styles.gestureRoot}>
				<ClerkProvider
					tokenCache={tokenCache}
					publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
				>
					<BottomSheetModalProvider>
						<StatusBar style='dark' />
						<Toast />
						<RootLayoutWithAuth />
					</BottomSheetModalProvider>
				</ClerkProvider>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
};

export default RootLayout;
