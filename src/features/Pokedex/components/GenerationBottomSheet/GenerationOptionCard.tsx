import DotsSmall from '@assets/images/dots-small.svg';
import PokeballFull from '@assets/images/pokeball-full.svg';
import { SPRITE_URL } from '@constants/api';
import { backgroundColors, textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { Image } from 'expo-image';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { type GenerationOptionCardProps } from './types';

const GENERATION_SHEET_DOTS_SIZE = 160;
const GENERATION_SHEET_POKEBALL_SIZE = 100;

const GenerationOptionCard = ({ option, isSelected, onOptionPress }: GenerationOptionCardProps) => (
	<TouchableOpacity
		testID={option.testID}
		activeOpacity={sharedStyles.opacity.active}
		onPress={() => onOptionPress(option.id)}
		className='relative w-[48%] overflow-hidden px-3 pt-3 pb-2 items-center justify-center gap-3'
		style={[
			styles.optionCard,
			{ backgroundColor: isSelected ? typeColors.dragon : backgroundColors.inactive },
		]}
	>
		<View
			className='absolute'
			style={[styles.optionDotsDecoration, !isSelected && styles.inactiveOpacity]}
		>
			<DotsSmall
				width={GENERATION_SHEET_DOTS_SIZE}
				height={GENERATION_SHEET_DOTS_SIZE}
				fill={textColor.primary}
			/>
		</View>

		<View
			className='absolute'
			style={[styles.optionPokeballDecoration, !isSelected && styles.inactiveOpacity]}
		>
			<PokeballFull
				width={GENERATION_SHEET_POKEBALL_SIZE}
				height={GENERATION_SHEET_POKEBALL_SIZE}
				fill={textColor.primary}
			/>
		</View>

		<View className='flex-row'>
			{option.starterIds.map(starterId => (
				<Image
					key={starterId}
					source={{ uri: SPRITE_URL(starterId) }}
					contentFit='contain'
					style={styles.optionSprite}
				/>
			))}
		</View>

		<Text
			numberOfLines={1}
			adjustsFontSizeToFit
			minimumFontScale={0.9}
			className='w-full text-center'
			style={[styles.optionLabel, { color: isSelected ? textColor.primary : textColor.grey }]}
		>
			{option.label}
		</Text>
	</TouchableOpacity>
);

export default GenerationOptionCard;
