import { pokeballColors } from '@constants/colors';
import sharedStyles, { TOAST_Z_INDEX } from '@constants/sharedStyles';
import { useToastConfig } from '@store/toastStore';
import { useToastAnimation } from '@utils/animations';
import { useEffect } from 'react';
import Pokeball from '@assets/images/pokeball-full.svg';
import { Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const POKEBALL_SIZE = 20;

const Toast = () => {
	const { top } = useSafeAreaInsets();

	const { text, backgroundColor, isPokeballColored } = useToastConfig();

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
				animatedStyle,
				{
					position: 'absolute',
					zIndex: TOAST_Z_INDEX,
					alignSelf: 'center',
					minHeight: 48,
					maxWidth: '90%',
					borderRadius: 25,
					paddingHorizontal: 20,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 8,
					backgroundColor,
					top: top + 20,
					...sharedStyles.shadow,
				},
			]}
		>
			<Pokeball
				width={POKEBALL_SIZE}
				height={POKEBALL_SIZE}
				fill={pokeballColor.fill}
			/>

			<Text
				className='text-base text-white capitalize'
				numberOfLines={1}
			>
				{text}
			</Text>

			<Pokeball
				width={POKEBALL_SIZE}
				height={POKEBALL_SIZE}
				fill={pokeballColor.fill}
			/>
		</Animated.View>
	);
};

export default Toast;
