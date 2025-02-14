import { View, Text, ActivityIndicator, Alert } from 'react-native';
import React from 'react';
import styles from './styles';
import usePokemonSprites from '@/src/hooks/usePokemonSprites';

const Home = () => {
	const { sprites, isLoading, hasError } = usePokemonSprites();

	if (isLoading) return <ActivityIndicator size='large' />;

	if (hasError) {
		Alert.alert('Error', 'Failed to fetch some Pokemon data.');
		return (
			<View>
				<Text>An error occurred.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text>Home</Text>
			{sprites.map((sprite, index) => (
				<Text key={index}>{sprite}</Text>
			))}
		</View>
	);
};

export default Home;
