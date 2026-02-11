import { Text } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { evolveAnim } from '@utils/animations';
import { textColor, typeColors } from '@constants/colors';
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
			className='my-5 flex-row items-center self-center gap-[10px]'
		>
			<Text
				className='w-[90px] pl-5 text-center text-xs'
				numberOfLines={1}
				adjustsFontSizeToFit
				minimumFontScale={0.5}
			>
				{minLevel ? 'Evolves at' : 'Evolves into'}
			</Text>

			<MaterialCommunityIcons
				name='arrow-down-bold-circle-outline'
				size={24}
				color={textColor.black}
			/>

			<Text
				className='w-[90px] rounded-[5px] px-[10px] py-[5px] text-center text-[10px] font-bold uppercase'
				style={{
					backgroundColor: minLevel
						? typeColors[type as keyof typeof typeColors]
						: 'transparent',
				}}
				numberOfLines={1}
				adjustsFontSizeToFit
			>
				{minLevel && `(Level ${minLevel})`}
			</Text>
		</Animated.View>
	);
};

export default EvolveCondition;
