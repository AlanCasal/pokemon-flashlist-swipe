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

const RESET_SPEED = 200;
const SHOW_SPEED = 500;
const DISPLAY_DURATION = 2000;
const HIDE_DELAY = RESET_SPEED + DISPLAY_DURATION;

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

	const hideToastAnimation = () => {
		opacity.value = withTiming(0, { duration: RESET_SPEED });
		scale.value = withTiming(0, { duration: RESET_SPEED });
	};

	const showToastAnimation = () => {
		translateY.value = withTiming(-20, { duration: SHOW_SPEED });
		opacity.value = withTiming(1, { duration: SHOW_SPEED });
		scale.value = withTiming(1, { duration: SHOW_SPEED });
	};

	useEffect(() => {
		if (isVisible) {
			// AbortController - Theo explanation https://www.youtube.com/watch?v=2sdXSczmvNc
			const controller = new AbortController();
			const { signal } = controller;

			// Reset animations immediately if a toast is already showing
			hideToastAnimation();

			// Show new toast after a brief delay
			(async () => {
				await new Promise(resolve => setTimeout(resolve, RESET_SPEED));
				if (signal.aborted) return;
				showToastAnimation();
			})();

			// Hide animation after delay
			(async () => {
				await new Promise(resolve => setTimeout(resolve, HIDE_DELAY));
				if (signal.aborted) return;
				hideToastAnimation();
				hideToast();
			})();

			return () => {
				controller.abort();
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible, text]);

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
