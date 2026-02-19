// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import { useStyles } from './styles';
import type { ScrollToTopProps } from './types';

const ScrollToTop = ({ visible, onPress, bottomInset }: ScrollToTopProps) => {
	const styles = useStyles({ bottomInset });

	if (!visible) return null;

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={onPress}
			style={styles.button}
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
