import { Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { typeBgColors } from '@constants/colors';

const Saved = () => {
	return (
		<LinearGradient
			colors={[typeBgColors.normal, 'white']}
			start={{ x: 0, y: 0 }}
			end={{ x: 2.5, y: 1 }}
			className='flex-1 items-center justify-center'
		>
			<Text>Saved</Text>
		</LinearGradient>
	);
};

export default Saved;
