import React from 'react';
import { Tabs } from 'expo-router';
import CustomTabBar from '@components/Tabs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{ headerShown: false }}
			tabBar={props => <CustomTabBar {...props} />}
		>
			<Tabs.Screen
				name='pokedex'
				options={{
					title: 'Pokedex',
					tabBarIcon: ({ color, size, focused }) => (
						<MaterialCommunityIcons
							name={focused ? 'credit-card-chip' : 'credit-card-chip-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='saved'
				initialParams={{ mode: 'saved' }}
				options={{
					title: 'Saved',
					tabBarIcon: ({ color, size, focused }) => (
						<MaterialCommunityIcons
							name={focused ? 'star' : 'star-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
