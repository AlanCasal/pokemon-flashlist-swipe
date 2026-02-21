import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type UseStylesProps = {
	backgroundColor: string;
};

const {
	shadow,
	zIndex: { toast },
} = sharedStyles;

export const useStyles = ({ backgroundColor }: UseStylesProps) => {
	const { top } = useSafeAreaInsets();

	return StyleSheet.create({
		container: {
			alignItems: 'center',
			alignSelf: 'center',
			backgroundColor,
			borderRadius: 25,
			flexDirection: 'row',
			gap: 8,
			justifyContent: 'center',
			maxWidth: '90%',
			minHeight: 48,
			paddingHorizontal: 20,
			position: 'absolute',
			top: top + 20,
			zIndex: toast,
			...shadow,
		},
		text: {
			color: 'white',
			fontSize: 16,
			textTransform: 'capitalize',
		},
	});
};
