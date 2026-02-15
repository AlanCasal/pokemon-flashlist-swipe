import Pokeball from '@assets/images/pokeball-full.svg';
import { pokeballColors } from '@constants/colors';
import { usePopAnimation } from '@utils/animations';
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import type { PokeBallProps } from './types';

const POKEBALL_SIZE = 17;
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const PokeBall = ({
	handleOnPress,
	isSaved,
	containerStyles = {},
	size = POKEBALL_SIZE,
	isDisabled = false,
	enablePopAnimation = false,
}: PokeBallProps) => {
	const { animatedStyle, triggerPopAnimation } = usePopAnimation();

	const handlePress = () => {
		if (enablePopAnimation) triggerPopAnimation();
		handleOnPress?.();
	};

	const colors = {
		fillColor: pokeballColors.white,
		fillOpacity: 0.7,
	};

	if (isSaved) {
		colors.fillColor = pokeballColors.red;
		colors.fillOpacity = 1;
	}

	return (
		<AnimatedTouchableOpacity
			style={[containerStyles, enablePopAnimation && animatedStyle]}
			onPress={event => {
				event.stopPropagation();
				handlePress();
			}}
			disabled={isDisabled}
		>
			<Pokeball
				fill={colors.fillColor}
				width={size}
				height={size}
			/>
		</AnimatedTouchableOpacity>
	);
};

export default PokeBall;
