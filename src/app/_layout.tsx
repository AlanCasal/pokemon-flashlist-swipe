import React from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
	useFonts,
	FingerPaint_400Regular,
} from '@expo-google-fonts/finger-paint';

const RootLayout = () => {
	const [fontsLoaded] = useFonts({
		FingerPaint_400Regular,
	});

	if (!fontsLoaded) return null;

	return (
		<>
			<StatusBar style="dark" translucent />
			<Slot />
		</>
	);
};

export default RootLayout;
