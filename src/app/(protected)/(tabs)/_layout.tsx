import CustomTabBar from '@components/Tabs';
import { typeColors } from '@constants/colors';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

const TabsLayout = () => {
	const { t } = useTranslation();

	return (
		<>
			<StatusBar
				style='light'
				backgroundColor={typeColors.dragon}
			/>
			<Tabs
				screenOptions={{
					headerShown: false,
					animation: 'fade',
					transitionSpec: { animation: 'timing', config: { duration: 250 } },
				}}
				tabBar={props => <CustomTabBar {...props} />}
			>
				<Tabs.Screen
					name='pokedex'
					options={{
						title: t('tabs.pokedexTitle'),
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
					options={{
						title: t('tabs.savedTitle'),
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
		</>
	);
};

export default TabsLayout;
