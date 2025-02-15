import { pokeballColors } from '@constants/colors';
import useToastContext from '@store/ToastContext/ToastContext';
import { useToastAnimation } from '@utils/animations';
import React, { lazy, Suspense, useEffect } from 'react';
import { Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';

const Pokeball = lazy(() => import('@assets/images/pokeball-full.svg'));

const POKEBALL_SIZE = 20;

const Toast = () => {
	const { top } = useSafeAreaInsets();

	const { toastConfig } = useToastContext();
	const { text, backgroundColor, isPokeballColored } = toastConfig;

	const { animatedStyle, triggerToastAnimation } = useToastAnimation();

	useEffect(() => {
		const cleanup = triggerToastAnimation();

		return () => {
			cleanup();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [text]);

	if (!text) return null;

	let pokeballColor = {
		fill: pokeballColors.white,
		stroke: pokeballColors.white,
	};

	if (isPokeballColored)
		pokeballColor = {
			fill: pokeballColors.red,
			stroke: pokeballColors.black,
		};

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
					width={POKEBALL_SIZE}
					height={POKEBALL_SIZE}
					fill={pokeballColor.fill}
				/>
			</Suspense>

			<Text
				style={styles.text}
				numberOfLines={1}
			>
				{text}
			</Text>

			<Suspense fallback={null}>
				<Pokeball
					width={POKEBALL_SIZE}
					height={POKEBALL_SIZE}
					fill={pokeballColor.fill}
				/>
			</Suspense>
		</Animated.View>
	);
};

export default Toast;
