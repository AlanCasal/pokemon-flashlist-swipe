import React, { useEffect } from 'react';
import { router, Stack } from 'expo-router';
import {
	useFonts,
	FingerPaint_400Regular,
} from '@expo-google-fonts/finger-paint';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import SavedContext from '@/src/store/SavedContext';
import useSavedContextValue from '@/src/store/SavedContext/SavedContextValue';
const queryClient = new QueryClient();

const RootLayout = () => {
	const savedContextValue = useSavedContextValue();

	const [fontsLoaded] = useFonts({
		FingerPaint_400Regular,
	});

	useEffect(() => {
		if (fontsLoaded) {
			router.replace('/(tabs)/pokedex');
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) return null;

	return (
		<QueryClientProvider client={queryClient}>
			<SavedContext.Provider value={savedContextValue}>
				<StatusBar style="dark" />
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
		</QueryClientProvider>
	);
};

export default RootLayout;
