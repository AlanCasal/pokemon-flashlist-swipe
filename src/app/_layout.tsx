import React from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const _layout = () => {
	return (
		<>
			<StatusBar style="dark" translucent />
			<Slot />
		</>
	);
};

export default _layout;
