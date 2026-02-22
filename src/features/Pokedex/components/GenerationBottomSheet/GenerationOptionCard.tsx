import PokeballFull from '@assets/images/pokeball-full.svg';
import Dots from '@components/common/Dots';
import { SPRITE_URL } from '@constants/api';
import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { Image } from 'expo-image';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { type GenerationOptionCardProps } from './types';

const GENERATION_SHEET_POKEBALL_SIZE = 100;

const GenerationOptionCard = ({ option, isSelected, onOptionPress }: GenerationOptionCardProps) => {
	const optionCardStateStyle = isSelected ? styles.optionCardSelected : styles.optionCardUnselected;
	const optionLabelStateStyle = isSelected
		? styles.optionLabelSelected
		: styles.optionLabelUnselected;

	return (
		<TouchableOpacity
			testID={option.testID}
			activeOpacity={sharedStyles.opacity.active}
			onPress={() => onOptionPress(option.id)}
			style={[styles.optionCard, optionCardStateStyle]}
		>
			<View style={!isSelected && styles.inactiveOpacity}>
				<Dots
					size={160}
					position={{ left: -80, top: -50 }}
				/>
			</View>

			<View style={[styles.optionPokeballDecoration, !isSelected && styles.inactiveOpacity]}>
				<PokeballFull
					width={GENERATION_SHEET_POKEBALL_SIZE}
					height={GENERATION_SHEET_POKEBALL_SIZE}
					fill={textColor.light}
				/>
			</View>

			<View style={styles.optionSpriteRow}>
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
				style={[styles.optionLabel, optionLabelStateStyle]}
			>
				{option.label}
			</Text>
		</TouchableOpacity>
	);
};

export default GenerationOptionCard;
