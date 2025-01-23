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

export const fadeInAnim = (delay = BASE_DELAY) => {
	return FadeIn.duration(BASE_FADE_IN_DURATION).delay(delay);
};

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

	const jumpAnimation = () => {
		scale.value = withTiming(SCALE_UP, { duration: POP_DURATION });
		translateY.value = withTiming(MOVE_UP, { duration: POP_DURATION });
	};

	const returnAnimation = () => {
		scale.value = withTiming(1, { duration: POP_DURATION });
		translateY.value = withTiming(0, { duration: POP_DURATION });
	};

	const triggerPopAnimation = () => {
		resetAnimation();

		jumpAnimation();

		setTimeout(() => returnAnimation(), POP_DURATION);
	};

	return { animatedStyle, triggerPopAnimation };
};

/********************* TOAST *********************/

const TOAST_RESET_SPEED = 200;
const TOAST_SHOW_SPEED = 500;
const TOAST_DISPLAY_DURATION = 2000;
const TOAST_HIDE_DELAY = TOAST_RESET_SPEED + TOAST_DISPLAY_DURATION;

export const useToastAnimation = () => {
	const translateY = useSharedValue(-100);
	const opacity = useSharedValue(0);
	const scale = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }, { scale: scale.value }],
		opacity: opacity.value,
	}));

	const resetAnimation = () => {
		opacity.value = withTiming(0, { duration: TOAST_RESET_SPEED });
		scale.value = withTiming(0, { duration: TOAST_RESET_SPEED });
	};

	const toastAnimation = () => {
		translateY.value = withTiming(-20, { duration: TOAST_SHOW_SPEED });
		opacity.value = withTiming(1, { duration: TOAST_SHOW_SPEED });
		scale.value = withTiming(1, { duration: TOAST_SHOW_SPEED });
	};

	const triggerToastAnimation = () => {
		resetAnimation();

		const showTimeoutId = setTimeout(() => {
			toastAnimation();
		}, TOAST_RESET_SPEED);

		const hideTimeoutId = setTimeout(() => {
			resetAnimation();
		}, TOAST_HIDE_DELAY);

		return () => {
			clearTimeout(showTimeoutId);
			clearTimeout(hideTimeoutId);
		};
	};

	return { animatedStyle, triggerToastAnimation };
};
