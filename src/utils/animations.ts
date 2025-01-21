import { FadeIn, FadeInLeft, FadeInRight } from 'react-native-reanimated';

export const BASE_DELAY = 800;
export const BASE_FADE_IN_DURATION = 500;

export const fadeInAnim = (delay = BASE_DELAY) =>
	FadeIn.duration(BASE_FADE_IN_DURATION).delay(delay);

export const evolveAnim = (direction: 'left' | 'right', delay: number) => {
	return direction === 'left'
		? FadeInLeft.duration(BASE_FADE_IN_DURATION).delay(delay)
		: FadeInRight.duration(BASE_FADE_IN_DURATION).delay(delay);
};
