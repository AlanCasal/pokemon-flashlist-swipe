import React, { useEffect, useMemo } from 'react';
import { router, Stack } from 'expo-router';
import {
	useFonts,
	FingerPaint_400Regular,
} from '@expo-google-fonts/finger-paint';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import SavedContext from '@store/SavedContext';
import ToastContext from '@store/ToastContext';
import useSavedContextValue from '@store/SavedContext/SavedContextValue';
import useToastContextValue from '@store/ToastContext/ToastContextValue';
import Toast from '../components/Toast/Toast';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
		if (fontsLoaded) router.replace('/home');
	}, [fontsLoaded]);

	if (!fontsLoaded) return null;

	return (
		<QueryClientProvider client={queryClient}>
			<ToastContext.Provider value={toastContextValue}>
				<SavedContext.Provider value={memoizedSavedContextValue}>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<StatusBar style='dark' />
						<Toast />
						<Stack screenOptions={{ headerShown: false }}>
							<Stack.Screen name='(tabs)' />
							<Stack.Screen
								name='home'
								options={{ animation: 'fade' }}
							/>
							<Stack.Screen
								name='details'
								options={{ animation: 'fade' }}
							/>
						</Stack>
					</GestureHandlerRootView>
				</SavedContext.Provider>
			</ToastContext.Provider>
		</QueryClientProvider>
	);
};

export default RootLayout;
