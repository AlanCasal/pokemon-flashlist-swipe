import { Text } from 'react-native';
import React from 'react';
import styles from './styles';
import Animated from 'react-native-reanimated';
import { evolveAnim } from '@/src/utils/animations';
import { textColor, typeColors } from '@/src/constants/colors';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EvolveConditionProps {
	type: keyof typeof typeColors;
	minLevel: number | null;
	direction: 'left' | 'right';
	delay: number;
}

const EvolveCondition = ({
	type,
	minLevel,
	direction,
	delay,
}: EvolveConditionProps) => {
	return (
		<Animated.View
			entering={evolveAnim(direction, delay)}
			style={styles.levelContainer}
		>
			<Text style={styles.evolvesAtText}>Evolves at</Text>

			<MaterialCommunityIcons
				name="arrow-down-bold-circle-outline"
				size={24}
				color={textColor.black}
			/>

			<Text
				style={[
					styles.levelText,
					{
						backgroundColor: typeColors[type as keyof typeof typeColors],
					},
				]}
			>
				(Level {minLevel})
			</Text>
		</Animated.View>
	);
};

export default EvolveCondition;
