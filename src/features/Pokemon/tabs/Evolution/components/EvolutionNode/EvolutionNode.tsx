import PokemonAvatar from '@components/common/PokemonAvatar';
import { sharedStyles } from '@constants/sharedStyles';
import { fadeInAnim } from '@utils/animations';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { DEFAULT_NODE_FONT_SIZE, DEFAULT_NODE_SIZE } from '../../constants';
import { formatTriggerLabel } from '../../helpers';
import styles from '../../styles';
import type { EvolutionNodeProps } from '../../types';

const EvolutionNode = ({
	delay,
	fontSize = DEFAULT_NODE_FONT_SIZE,
	imgUrl,
	isNodeSaved,
	isSelected = false,
	onPress,
	pokemon,
	selectedTextColor,
	size = DEFAULT_NODE_SIZE,
	trigger,
}: EvolutionNodeProps) => {
	const { t } = useTranslation();
	const triggerText = formatTriggerLabel(trigger);
	const activeOpacity = onPress ? sharedStyles.opacity.active : 1;

	return (
		<View>
			<TouchableOpacity
				activeOpacity={activeOpacity}
				onPress={onPress}
			>
				<Animated.View
					entering={fadeInAnim(delay)}
					style={styles.nodeImageContainer}
				>
					<PokemonAvatar
						uri={imgUrl ?? ''}
						isSaved={isNodeSaved}
						centerImage
						contentFit='contain'
						pokeballSize={size}
						imageStyle={[styles.nodeImage, { height: size, width: size }]}
					/>
				</Animated.View>
			</TouchableOpacity>

			<View style={styles.nodeTextContainer}>
				{trigger && (
					<Animated.Text
						entering={fadeInAnim(delay)}
						style={[styles.nodeTrigger, { fontSize: fontSize * 0.85 }]}
					>
						{triggerText}
					</Animated.Text>
				)}
				<Animated.Text
					entering={fadeInAnim(delay)}
					style={[
						styles.nodeName,
						{ fontSize, lineHeight: fontSize + 4 },
						isSelected && selectedTextColor ? { color: selectedTextColor } : null,
					]}
				>
					{pokemon}
				</Animated.Text>
				{isSelected ? (
					<Animated.Text
						entering={fadeInAnim(delay)}
						style={[
							styles.current,
							isSelected && selectedTextColor ? { color: selectedTextColor } : {},
						]}
					>
						{t('evolution.current')}
					</Animated.Text>
				) : null}
			</View>
		</View>
	);
};

export default EvolutionNode;
