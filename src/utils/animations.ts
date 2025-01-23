import {
	FadeIn,
	FadeInLeft,
	FadeInRight,
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

/********************* FADE *********************/

export const BASE_DELAY = 800;
export const BASE_FADE_IN_DURATION = 500;

export const fadeInAnim = (delay = BASE_DELAY) =>
	FadeIn.duration(BASE_FADE_IN_DURATION).delay(delay);

export const evolveAnim = (direction: 'left' | 'right', delay: number) => {
	return direction === 'left'
		? FadeInLeft.duration(BASE_FADE_IN_DURATION).delay(delay)
		: FadeInRight.duration(BASE_FADE_IN_DURATION).delay(delay);
};

/********************* POP *********************/

const SCALE_UP = 1.2;
const MOVE_UP = -15;
const POP_DURATION = 400;

export const usePopAnimation = () => {
	const scale = useSharedValue(1);
	const translateY = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }, { translateY: translateY.value }],
	}));

	const resetAnimation = () => {
		scale.value = 1;
		translateY.value = 0;
	};

	const triggerPop = () => {
		const controller = new AbortController();
		const { signal } = controller;

		resetAnimation();

		(async () => {
			scale.value = withTiming(SCALE_UP, { duration: POP_DURATION });
			translateY.value = withTiming(MOVE_UP, { duration: POP_DURATION });

			await new Promise(resolve => setTimeout(resolve, POP_DURATION));
			if (signal.aborted) return;

			scale.value = withTiming(1, { duration: POP_DURATION });
			translateY.value = withTiming(0, { duration: POP_DURATION });
		})();

		return controller;
	};

	return { animatedStyle, triggerPop };
};
