import { typeColors } from '@constants/colors';
import { SCREEN_HORIZONTAL_PADDING } from '@constants/sharedStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import type { ScrollToTopProps } from './types';

const ScrollToTop = ({ visible, onPress, bottomInset }: ScrollToTopProps) => {
	if (!visible) return null;

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={onPress}
			className='absolute h-14 w-14 items-center justify-center rounded-full'
			style={{
				right: SCREEN_HORIZONTAL_PADDING,
				bottom: bottomInset + 10,
				backgroundColor: typeColors.fighting,
				zIndex: 40,
				elevation: 40,
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
