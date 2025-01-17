import React from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
	return (
		<>
			<StatusBar style="dark" translucent />
			<Slot />
		</>
	);
};

export default RootLayout;
