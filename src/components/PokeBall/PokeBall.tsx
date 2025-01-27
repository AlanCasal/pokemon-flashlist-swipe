import { pokeballColors } from '@/src/constants/colors';
import { usePopAnimation } from '@/src/utils/animations';
import React, { lazy, Suspense } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

const Pokeball = lazy(() => import('@/assets/images/pokeball-full.svg'));
const POKEBALL_SIZE = 17;

interface PokeBallProps {
	handleOnPress?: () => void;
	isSaved?: boolean;
	size?: number;
	containerStyles?: StyleProp<ViewStyle>;
	isDisabled?: boolean;
	enablePopAnimation?: boolean;
}

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

	const AnimatedTouchableOpacity = enablePopAnimation
		? Animated.createAnimatedComponent(TouchableOpacity)
		: TouchableOpacity;

	return (
		<AnimatedTouchableOpacity
			style={[containerStyles, enablePopAnimation && animatedStyle]}
			onPress={handlePress}
			disabled={isDisabled}
		>
			<Suspense fallback={null}>
				<Pokeball fill={colors.fillColor} width={size} height={size} />
			</Suspense>
		</AnimatedTouchableOpacity>
	);
};

export default PokeBall;
