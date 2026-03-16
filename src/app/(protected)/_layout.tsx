import { Stack } from 'expo-router';

const ProtectedLayout = () => (
	<Stack screenOptions={{ headerShown: false }}>
		<Stack.Screen
			name='(tabs)'
			options={{ animation: 'fade' }}
		/>
		<Stack.Screen
			name='details'
			options={{ animation: 'fade' }}
		/>
	</Stack>
);

export default ProtectedLayout;
