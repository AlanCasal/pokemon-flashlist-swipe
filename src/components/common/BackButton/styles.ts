import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
	const { top } = useSafeAreaInsets();

	return StyleSheet.create({
		backButton: {
			left: 26,
			padding: 8,
			position: 'absolute',
			top: top + 6,
			zIndex: 30,
		},
	});
};
