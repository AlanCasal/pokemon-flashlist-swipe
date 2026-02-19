import { StyleSheet } from 'react-native';

type UseStylesProps = {
	bottomInset: number;
};

export const useStyles = ({ bottomInset }: UseStylesProps) => {
	return StyleSheet.create({
		container: {
			alignItems: 'center',
			bottom: 0,
			columnGap: 4,
			flexDirection: 'row',
			justifyContent: 'center',
			left: 0,
			paddingBottom: bottomInset + 10,
			position: 'absolute',
			right: 0,
		},
	});
};
