/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomTab from './CustomTab';

const CustomTabs = ({ state, descriptors, navigation }: any) => {
	const { bottom } = useSafeAreaInsets();

	return (
		<View style={[styles.container, { paddingBottom: bottom + 10 }]}>
			{state.routes.map((route: any, index: any) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;

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
						tabBarIcon={options.tabBarIcon}
						onPress={onPress}
					/>
				);
			})}
		</View>
	);
};

export default CustomTabs;
