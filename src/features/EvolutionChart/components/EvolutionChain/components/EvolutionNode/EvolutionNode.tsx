import PokemonAvatar from '@components/common/PokemonAvatar';
import { fadeInAnim } from '@utils/animations';
import { View } from 'react-native';
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
	pokemon,
	size = DEFAULT_NODE_SIZE,
	trigger,
}: EvolutionNodeProps) => {
	const triggerText = formatTriggerLabel(trigger);

	return (
		<View>
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

			<View style={styles.nodeTextContainer}>
				{trigger && (
					<Animated.Text
						entering={fadeInAnim(delay)}
						style={[styles.nodeTrigger, { fontSize: fontSize * 0.65 }]}
					>
						{triggerText}
					</Animated.Text>
				)}
				<Animated.Text
					entering={fadeInAnim(delay)}
					style={[styles.nodeName, { fontSize, lineHeight: fontSize + 4 }]}
				>
					{pokemon}
				</Animated.Text>
			</View>
		</View>
	);
};

export default EvolutionNode;
