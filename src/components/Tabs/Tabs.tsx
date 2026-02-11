/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomTab from './CustomTab';

const CustomTabs = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	const { bottom } = useSafeAreaInsets();

	return (
		<View
			className='absolute right-0 bottom-0 left-0 flex-row items-center justify-center gap-1'
			style={{ paddingBottom: bottom + 10 }}
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const tabLabel =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;
				const label = typeof tabLabel === 'string' ? tabLabel : route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented)
						navigation.navigate(route.name, route.params);
				};

				return (
					<CustomTab
						key={index}
						isFocused={isFocused}
						label={label}
						tabBarIcon={options.tabBarIcon ?? (() => null)}
						onPress={onPress}
					/>
				);
			})}
		</View>
	);
};

export default CustomTabs;
