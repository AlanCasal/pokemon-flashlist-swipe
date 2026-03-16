import CustomTabBar from '@components/Tabs';
import { typeColors } from '@constants/colors';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

type TabBarIconProps = {
	color: string;
	focused: boolean;
	size: number;
};

const TabsLayout = () => {
	const { t } = useTranslation();

	return (
		<>
			<StatusBar
				style='light'
				backgroundColor={typeColors.dragon}
			/>
			<Tabs
				screenOptions={
					{
						headerShown: false,
						animation: 'fade',
						transitionSpec: { animation: 'timing', config: { duration: 250 } },
					} as BottomTabNavigationOptions
				}
				tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
			>
				<Tabs.Screen
					name='pokedex'
					options={
						{
							tabBarLabel: t('tabs.pokedexTitle'),
							tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
								<MaterialCommunityIcons
									name={focused ? 'credit-card-chip' : 'credit-card-chip-outline'}
									size={size}
									color={color}
								/>
							),
						} as BottomTabNavigationOptions
					}
				/>
				<Tabs.Screen
					name='saved'
					options={
						{
							tabBarLabel: t('tabs.savedTitle'),
							tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
								<MaterialCommunityIcons
									name={focused ? 'star' : 'star-outline'}
									size={size}
									color={color}
								/>
							),
						} as BottomTabNavigationOptions
					}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;
