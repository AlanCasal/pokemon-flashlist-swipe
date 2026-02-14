import { Stack } from 'expo-router';
import '@/global.css';
import {
	useFonts,
	FingerPaint_400Regular,
} from '@expo-google-fonts/finger-paint';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import Toast from '../components/Toast/Toast';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

const RootLayout = () => {
	const [fontsLoaded] = useFonts({
		FingerPaint_400Regular,
	});

	if (!fontsLoaded) return null;

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
