import React, { useEffect, useMemo } from 'react';
import { router, Stack } from 'expo-router';
import {
	useFonts,
	FingerPaint_400Regular,
} from '@expo-google-fonts/finger-paint';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import SavedContext from '@/src/store/SavedContext';
import ToastContext from '@/src/store/ToastContext';
import useSavedContextValue from '@/src/store/SavedContext/SavedContextValue';
import useToastContextValue from '@/src/store/ToastContext/ToastContextValue';
import Toast from '../components/Toast/Toast';

const queryClient = new QueryClient();

const RootLayout = () => {
	const savedContextValue = useSavedContextValue();
	const toastContextValue = useToastContextValue();

	const [fontsLoaded] = useFonts({
		FingerPaint_400Regular,
	});

	const memoizedSavedContextValue = useMemo(
		() => savedContextValue,
		[savedContextValue]
	);

	useEffect(() => {
		if (fontsLoaded) {
			router.replace('/(tabs)/pokedex');
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) return null;

	return (
		<QueryClientProvider client={queryClient}>
			<ToastContext.Provider value={toastContextValue}>
				<SavedContext.Provider value={memoizedSavedContextValue}>
					<StatusBar style="dark" />
					<Toast />
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="(tabs)" />
						<Stack.Screen
							name="details"
							options={{
								presentation: 'modal',
								animation: 'slide_from_bottom',
							}}
						/>
					</Stack>
				</SavedContext.Provider>
			</ToastContext.Provider>
		</QueryClientProvider>
	);
};

export default RootLayout;
