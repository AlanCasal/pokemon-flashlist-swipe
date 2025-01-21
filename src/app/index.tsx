import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Index = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'white',
			}}
		>
			<ActivityIndicator size="large" color="#000" />
		</View>
	);
};

export default Index;
