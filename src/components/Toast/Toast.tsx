import { Text } from 'react-native';
import React, { lazy, Suspense, useEffect } from 'react';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import styles from './styles';
import useToastContext from '@/src/store/ToastContext/ToastContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Pokeball = lazy(() => import('@/assets/images/pokeball-full.svg'));

const Toast = () => {
	const { top } = useSafeAreaInsets();

	const { toastConfig, hideToast } = useToastContext();
	const { isVisible, text, backgroundColor } = toastConfig;

	const translateY = useSharedValue(-100);
	const opacity = useSharedValue(0);
	const scale = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }, { scale: scale.value }],
		opacity: opacity.value,
	}));

	useEffect(() => {
		if (isVisible) {
			// Show animation
			translateY.value = withTiming(-20, { duration: 500 });
			opacity.value = withTiming(1, { duration: 500 });
			scale.value = withTiming(1, { duration: 500 });
		}

		// Hide animation after delay
		const hideToastAnimation = () => {
			opacity.value = withTiming(0);
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
		<Animated.View
			style={[
				styles.container,
				animatedStyle,
				{ backgroundColor, top: top + 20 },
			]}
		>
			<Suspense fallback={null}>
				<Pokeball
					width={20}
					height={20}
					fill="red"
					stroke="black"
					strokeWidth={2}
				/>
			</Suspense>

			<Text style={styles.text} numberOfLines={1}>
				{text}
			</Text>

			<Suspense fallback={null}>
				<Pokeball
					width={20}
					height={20}
					fill="red"
					stroke="black"
					strokeWidth={2}
				/>
			</Suspense>
		</Animated.View>
	);
};

export default Toast;
