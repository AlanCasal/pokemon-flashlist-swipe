import { textColor, typeColors } from '@constants/colors';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { evolveAnim } from '@utils/animations';
import texts from '@utils/texts.json';
import { Text } from 'react-native';
import Animated from 'react-native-reanimated';

import type { EvolveConditionProps } from './types';

const EvolveCondition = ({ type, minLevel, direction, delay }: EvolveConditionProps) => {
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
				{minLevel ? texts.evolution.evolvesAt : texts.evolution.evolvesInto}
			</Text>

			<MaterialCommunityIcons
				name='arrow-down-bold-circle-outline'
				size={24}
				color={textColor.black}
			/>

			<Text
				className='w-[90px] rounded-[5px] px-[10px] py-[5px] text-center text-[10px] font-bold uppercase'
				style={{
					backgroundColor: minLevel ? typeColors[type] : 'transparent',
				}}
				numberOfLines={1}
				adjustsFontSizeToFit
			>
				{minLevel && `(${texts.evolution.levelPrefix} ${minLevel})`}
			</Text>
		</Animated.View>
	);
};

export default EvolveCondition;
