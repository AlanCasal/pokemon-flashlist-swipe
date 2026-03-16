import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
	const { bottom } = useSafeAreaInsets();

	return StyleSheet.create({
		container: {
			bottom: 0,
			left: 0,
			position: 'absolute',
			right: 0,
		},
		tabsRow: {
			alignItems: 'center',
			columnGap: 4,
			flexDirection: 'row',
			justifyContent: 'center',
			paddingBottom: bottom + 10,
		},
	});
};
