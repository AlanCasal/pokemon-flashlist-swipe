import { useEffect } from 'react';
import {
	cancelAnimation,
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';

const SEARCH_LOADING_SPINNER_ROTATION_DURATION_MS = 900;

export const useSearchLoadingSpinner = (enabled: boolean) => {
	const spinnerRotation = useSharedValue(0);

	const spinnerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${spinnerRotation.value}deg` }],
	}));

	useEffect(() => {
		if (!enabled) {
			cancelAnimation(spinnerRotation);
			spinnerRotation.value = 0;
			return;
		}

		spinnerRotation.value = 0;
		spinnerRotation.value = withRepeat(
			withTiming(360, {
				duration: SEARCH_LOADING_SPINNER_ROTATION_DURATION_MS,
				easing: Easing.linear,
			}),
			-1,
			false,
		);

		return () => {
			cancelAnimation(spinnerRotation);
		};
	}, [enabled, spinnerRotation]);

	return spinnerAnimatedStyle;
};
