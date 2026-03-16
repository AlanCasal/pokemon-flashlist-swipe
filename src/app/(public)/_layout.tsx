import { Stack } from 'expo-router';

const PublicLayout = () => (
	<Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
		<Stack.Screen name='index' />
		<Stack.Screen name='sign-in' />
		<Stack.Screen name='sign-up' />
	</Stack>
);

export default PublicLayout;
