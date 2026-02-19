/* eslint-disable import/no-extraneous-dependencies */
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomTab from './CustomTab';
import { useStyles } from './styles';

const CustomTabs = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	const { bottom } = useSafeAreaInsets();
	const styles = useStyles({ bottomInset: bottom });

	return (
		<View style={styles.container}>
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

					if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
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
