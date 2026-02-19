/* eslint-disable import/no-extraneous-dependencies */
import { backgroundColors, typeColors } from '@constants/colors';
import { MotiView } from 'moti';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeInRight, LinearTransition } from 'react-native-reanimated';

import { useStyles } from './styles';
import type { CustomTabProps } from './types';

const CustomTab = ({
	isFocused,
	label,
	tabBarIcon,
	onPress,
	isRounded,
	activeBackgroundColor = typeColors.dragon,
	inactiveBackgroundColor = typeColors.dark,
	activeColor = backgroundColors.light,
	inactiveColor = backgroundColors.inactive,
}: CustomTabProps) => {
	const styles = useStyles({ activeColor, inactiveColor, isFocused });

	return (
		<MotiView layout={LinearTransition.springify().damping(80).stiffness(200)}>
			<MotiView
				style={styles.background}
				animate={{
					backgroundColor: isFocused ? activeBackgroundColor : inactiveBackgroundColor,
					...(isRounded ? { borderRadius: 100 } : {}),
				}}
			/>

			<TouchableOpacity
				activeOpacity={0.6}
				onPress={onPress}
				style={styles.button}
			>
				{tabBarIcon({
					color: isFocused ? activeColor : inactiveColor,
					size: 18,
					focused: isFocused,
				})}

				{isFocused && label && (
					<Animated.Text
						entering={FadeInRight.springify().damping(80).stiffness(200)}
						style={styles.label}
					>
						{label}
					</Animated.Text>
				)}
			</TouchableOpacity>
		</MotiView>
	);
};

export default CustomTab;
