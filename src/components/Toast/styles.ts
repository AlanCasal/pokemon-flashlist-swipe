import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

type UseStylesProps = {
	backgroundColor: string;
	topInset: number;
};

export const useStyles = ({ backgroundColor, topInset }: UseStylesProps) => {
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
			top: topInset + 20,
			zIndex: sharedStyles.zIndex.toast,
			...sharedStyles.shadow,
		},
		text: {
			color: 'white',
			fontSize: 16,
			textTransform: 'capitalize',
		},
	});
};
