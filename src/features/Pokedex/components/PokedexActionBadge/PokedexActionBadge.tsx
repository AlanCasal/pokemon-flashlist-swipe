import { sharedStyles } from '@constants/sharedStyles';
import { Text, View } from 'react-native';

import styles from './styles';

type PokedexActionBadgeProps = {
	containerTestID: string;
	labelTestID: string;
};

const PokedexActionBadge = ({ containerTestID, labelTestID }: PokedexActionBadgeProps) => (
	<View
		testID={containerTestID}
		style={styles.badge}
	>
		<Text
			testID={labelTestID}
			style={styles.badgeLabel}
		>
			{sharedStyles.pokedex.sortBadge.activeText}
		</Text>
	</View>
);

export default PokedexActionBadge;
