import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	withDelay,
} from 'react-native-reanimated';
import styles from './styles';
import useToastContext from '@/src/store/ToastContext/ToastContext';

const Toast = () => {
	const { toastConfig, hideToast } = useToastContext();
	const { isVisible, text, backgroundColor, icon } = toastConfig;

	const translateY = useSharedValue(-100);
	const opacity = useSharedValue(0);
	const scale = useSharedValue(0);
	const width = useSharedValue(50); // Initial circle width

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }, { scale: scale.value }],
		opacity: opacity.value,
		width: width.value,
		backgroundColor,
	}));

	useEffect(() => {
		if (isVisible) {
			// Show animation
			translateY.value = withTiming(-20);
			opacity.value = withTiming(1);
			scale.value = withTiming(1);

			// Expand width after initial appearance
			width.value = withDelay(150, withTiming(300, { duration: 300 }));
		}

		// Hide animation after delay
		const hideToastAnimation = () => {
			translateY.value = withTiming(-100);
			opacity.value = withTiming(0);
			width.value = withTiming(50);
			scale.value = withTiming(0);
		};

		const timeout = setTimeout(() => {
			hideToastAnimation();
			hideToast();
		}, 2000);

		return () => clearTimeout(timeout);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

	if (!isVisible) return null;

	return (
		<Animated.View style={[styles.container, animatedStyle]}>
			{icon && <View style={styles.iconContainer}>{icon}</View>}
			<Text style={styles.text} numberOfLines={1}>
				{text}
			</Text>
		</Animated.View>
	);
};

export default Toast;
