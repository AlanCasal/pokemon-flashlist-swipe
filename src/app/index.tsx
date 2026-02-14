import { View, ActivityIndicator } from 'react-native';
import { backgroundColors } from '../constants/colors';

const Index = () => {
	return (
		<View className='flex-1 items-center justify-center bg-white'>
			<ActivityIndicator
				size='large'
				color={backgroundColors.dark}
			/>
		</View>
	);
};

export default Index;
