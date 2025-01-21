import React, { useEffect } from 'react';
import { router, Stack } from 'expo-router';
import {
	useFonts,
	FingerPaint_400Regular,
} from '@expo-google-fonts/finger-paint';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

const queryClient = new QueryClient();

const RootLayout = () => {
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
			<Stack screenOptions={{ headerShown: false }}>
				<StatusBar style="dark" />
				<Stack.Screen
					name="details"
					options={{
						presentation: 'modal',
						animation: 'slide_from_bottom',
					}}
				/>
			</Stack>
		</QueryClientProvider>
	);
};

export default RootLayout;
