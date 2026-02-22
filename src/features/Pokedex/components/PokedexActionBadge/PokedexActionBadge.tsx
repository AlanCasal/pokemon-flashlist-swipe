import { Text, View } from 'react-native';

import styles from './styles';

type PokedexActionBadgeProps = {
	containerTestID: string;
	labelTestID: string;
	label?: string;
};

const DEFAULT_BADGE_TEXT = '1';

const PokedexActionBadge = ({
	containerTestID,
	labelTestID,
	label = DEFAULT_BADGE_TEXT,
}: PokedexActionBadgeProps) => (
	<View
		testID={containerTestID}
		style={styles.badge}
	>
		<Text
			testID={labelTestID}
			style={styles.badgeLabel}
		>
			{label}
		</Text>
	</View>
);

export default PokedexActionBadge;
