import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import Tabs from '@/src/components/Tabs';
import { typeColors } from '@/src/constants/colors';

const Saved = () => {
	return (
		<>
			<View style={styles.container}>
				<Text>Saved</Text>
			</View>

			{/* <Tabs
				defaultActiveIndex={1}
				activeBackgroundColor={typeColors.dragon}
				inactiveBackgroundColor={typeColors.dark}
			/> */}
		</>
	);
};

export default Saved;
