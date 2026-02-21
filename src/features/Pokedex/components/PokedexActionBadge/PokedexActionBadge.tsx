import { Text, View } from 'react-native';

import styles from './styles';

type PokedexActionBadgeProps = {
	containerTestID: string;
	labelTestID: string;
};

const ACTIVE_BADGE_TEXT = '1';

const PokedexActionBadge = ({ containerTestID, labelTestID }: PokedexActionBadgeProps) => (
	<View
		testID={containerTestID}
		style={styles.badge}
	>
		<Text
			testID={labelTestID}
			style={styles.badgeLabel}
		>
			{ACTIVE_BADGE_TEXT}
		</Text>
	</View>
);

export default PokedexActionBadge;
