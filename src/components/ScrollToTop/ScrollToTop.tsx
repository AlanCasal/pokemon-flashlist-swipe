// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { TouchableOpacity } from 'react-native';

import type { ScrollToTopProps } from './types';
import { useStyles } from './useStyles';

const HIDDEN_SCROLL_TO_TOP_TRANSLATE_Y = 80;

const ScrollToTop = ({ visible, onPress, bottomInset }: ScrollToTopProps) => {
	const styles = useStyles({ bottomInset });

	return (
		<MotiView
			testID='scroll-to-top-container'
			animate={{
				opacity: visible ? 1 : 0,
				translateY: visible ? 0 : HIDDEN_SCROLL_TO_TOP_TRANSLATE_Y,
			}}
			pointerEvents={visible ? 'auto' : 'none'}
			transition={{ type: 'timing', duration: 220 }}
			style={styles.button}
		>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onPress}
				style={styles.touchable}
			>
				<MaterialCommunityIcons
					name='arrow-up'
					size={28}
					color='white'
				/>
			</TouchableOpacity>
		</MotiView>
	);
};

export default ScrollToTop;
