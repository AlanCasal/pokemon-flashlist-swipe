import '@/global.css';

import { FingerPaint_400Regular, useFonts } from '@expo-google-fonts/finger-paint';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Toast from '../components/Toast/Toast';

const queryClient = new QueryClient();

const RootLayout = () => {
	const [fontsLoaded, fontError] = useFonts({ FingerPaint_400Regular });

	const isAppReady = fontsLoaded || Boolean(fontError);
	if (!isAppReady) {
		return (
			<View className='flex-1 items-center justify-center bg-white'>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<StatusBar style='dark' />
				<Toast />
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name='(tabs)' />
					<Stack.Screen
						name='home'
						options={{ animation: 'fade' }}
					/>
					<Stack.Screen
						name='details'
						options={{ animation: 'fade' }}
					/>
				</Stack>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
};

export default RootLayout;
