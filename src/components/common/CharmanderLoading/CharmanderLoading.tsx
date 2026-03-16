import charmanderAnimated from '@assets/animated/charmander-animated.gif';
import { Image } from 'expo-image';
import { View } from 'react-native';

import styles from './styles';

const CharmanderLoading = () => (
	<View style={styles.container}>
		<Image
			source={charmanderAnimated}
			style={styles.image}
			contentFit='contain'
		/>
	</View>
);

export default CharmanderLoading;
