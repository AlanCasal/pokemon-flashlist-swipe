import CustomTabBar from '@components/Tabs';
import { typeColors } from '@constants/colors';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import texts from '@utils/texts.json';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const TabsLayout = () => {
	return (
		<>
			<StatusBar
				style='light'
				backgroundColor={typeColors.dragon}
			/>
			<Tabs
				screenOptions={{ headerShown: false }}
				tabBar={props => <CustomTabBar {...props} />}
			>
				<Tabs.Screen
					name='pokedex'
					options={{
						title: texts.tabs.pokedexTitle,
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
						title: texts.tabs.savedTitle,
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
