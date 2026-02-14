import { TouchableOpacity } from 'react-native';
import { typeColors } from '@constants/colors';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ScrollToTopProps {
	visible: boolean;
	onPress: () => void;
	bottomInset: number;
}

const ScrollToTop = ({ visible, onPress, bottomInset }: ScrollToTopProps) => {
	if (!visible) return null;

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={onPress}
			className='absolute right-6 h-14 w-14 items-center justify-center rounded-full'
			style={{
				bottom: bottomInset + 10,
				backgroundColor: typeColors.fighting,
			}}
		>
			<MaterialCommunityIcons
				name='arrow-up'
				size={28}
				color='white'
			/>
		</TouchableOpacity>
	);
};

export default ScrollToTop;
