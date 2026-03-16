import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
	const { bottom } = useSafeAreaInsets();

	return StyleSheet.create({
		container: {
			alignItems: 'center',
			bottom: 0,
			columnGap: 4,
			flexDirection: 'row',
			justifyContent: 'center',
			left: 0,
			paddingBottom: bottom + 10,
			position: 'absolute',
			right: 0,
		},
	});
};
