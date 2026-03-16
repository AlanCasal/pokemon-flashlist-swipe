/* eslint-disable import/no-extraneous-dependencies */
import type { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { MotiView } from 'moti';
import { View } from 'react-native';

import type { TabBarVisibility } from '@/src/types';

import CustomTab from './CustomTab';
import { useStyles } from './useStyles';

const HIDDEN_TAB_BAR_TRANSLATE_Y = 120;
type BottomTabOptionsWithVisibility = BottomTabNavigationOptions & {
	tabBarVisibility?: TabBarVisibility;
};

const CustomTabs = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	const styles = useStyles();
	const focusedRoute = state.routes[state.index];
	const focusedRouteOptions = descriptors[focusedRoute.key]
		?.options as BottomTabOptionsWithVisibility;
	const tabBarVisibility: TabBarVisibility = focusedRouteOptions?.tabBarVisibility ?? 'visible';
	const isTabBarVisible = tabBarVisibility === 'visible';

	return (
		<MotiView
			testID='custom-tab-bar'
			animate={{
				opacity: isTabBarVisible ? 1 : 0,
				translateY: isTabBarVisible ? 0 : HIDDEN_TAB_BAR_TRANSLATE_Y,
			}}
			pointerEvents={isTabBarVisible ? 'box-none' : 'none'}
			transition={{ type: 'timing', duration: 220 }}
			style={styles.container}
		>
			<View style={styles.tabsRow}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const routeOptions = options as BottomTabOptionsWithVisibility;
					const tabLabel =
						routeOptions.tabBarLabel !== undefined
							? routeOptions.tabBarLabel
							: routeOptions.title !== undefined
								? routeOptions.title
								: route.name;
					const label = typeof tabLabel === 'string' ? tabLabel : route.name;

					const isFocused = state.index === index;

					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name, route.params);
						}
					};

					return (
						<CustomTab
							key={index}
							isFocused={isFocused}
							label={label}
							tabBarIcon={routeOptions.tabBarIcon ?? (() => null)}
							onPress={onPress}
						/>
					);
				})}
			</View>
		</MotiView>
	);
};

export default CustomTabs;
