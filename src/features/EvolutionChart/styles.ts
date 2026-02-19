import { StyleSheet } from 'react-native';

type UseStylesProps = {
	bottomInset: number;
};

export const useStyles = ({ bottomInset }: UseStylesProps) =>
	StyleSheet.create({
		closeButtonContainer: {
			alignSelf: 'center',
			bottom: 0,
			paddingBottom: bottomInset + 10,
			position: 'absolute',
		},
		container: {
			flex: 1,
		},
		contentContainer: {
			flex: 1,
			justifyContent: 'center',
			paddingBottom: 30,
		},
		loadingContainer: {
			alignItems: 'center',
			flex: 1,
			justifyContent: 'center',
		},
		title: {
			fontSize: 16,
			fontWeight: '700',
			lineHeight: 20,
			textTransform: 'uppercase',
		},
		titleContainer: {
			left: 20,
			marginTop: 60,
			position: 'absolute',
			top: '50%',
			transform: [{ rotate: '270deg' }],
			transformOrigin: 'left center',
			width: 'auto',
		},
	});
