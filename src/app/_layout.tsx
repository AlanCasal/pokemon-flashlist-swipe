import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
	useFonts,
	FingerPaint_400Regular,
} from '@expo-google-fonts/finger-paint';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const RootLayout = () => {
	const [fontsLoaded] = useFonts({
		FingerPaint_400Regular,
	});

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
