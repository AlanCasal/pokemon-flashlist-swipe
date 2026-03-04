import { textColor } from '@constants/colors';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { evolveAnim } from '@utils/animations';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import Animated from 'react-native-reanimated';

import { useStyles } from './styles';
import type { EvolveConditionProps } from './types';

const EvolveCondition = ({ type, minLevel, direction, delay }: EvolveConditionProps) => {
	const { t } = useTranslation();
	const styles = useStyles({ minLevel, type });

	return (
		<Animated.View
			entering={evolveAnim(direction, delay)}
			style={styles.container}
		>
			<Text
				style={styles.message}
				numberOfLines={1}
				adjustsFontSizeToFit
				minimumFontScale={0.5}
			>
				{minLevel ? t('evolution.evolvesAt') : t('evolution.evolvesInto')}
			</Text>

			<MaterialCommunityIcons
				name='arrow-right'
				size={24}
				color={textColor.grey}
			/>

			<Text
				style={styles.levelLabel}
				numberOfLines={1}
				adjustsFontSizeToFit
			>
				{minLevel && `(${t('evolution.levelPrefix')} ${minLevel})`}
			</Text>
		</Animated.View>
	);
};

export default EvolveCondition;
