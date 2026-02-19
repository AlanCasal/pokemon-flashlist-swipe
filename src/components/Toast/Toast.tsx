import Pokeball from '@assets/images/pokeball-full.svg';
import { pokeballColors } from '@constants/colors';
import { useToastConfig } from '@store/toastStore';
import { useToastAnimation } from '@utils/animations';
import { useEffect } from 'react';
import { Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useStyles } from './styles';

const POKEBALL_SIZE = 20;

const Toast = () => {
	const { top } = useSafeAreaInsets();

	const { text, backgroundColor, isPokeballColored } = useToastConfig();
	const styles = useStyles({
		backgroundColor: backgroundColor ?? pokeballColors.black,
		topInset: top,
	});

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

	if (isPokeballColored) {
		pokeballColor = {
			fill: pokeballColors.red,
			stroke: pokeballColors.black,
		};
	}

	return (
		<Animated.View style={[animatedStyle, styles.container]}>
			<Pokeball
				width={POKEBALL_SIZE}
				height={POKEBALL_SIZE}
				fill={pokeballColor.fill}
			/>

			<Text
				style={styles.text}
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
