import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

type UseStylesProps = {
	fontSize: number;
	size: number;
};

export const useStyles = ({ fontSize, size }: UseStylesProps) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
		},
		image: {
			height: size,
			width: size,
			zIndex: 1,
		},
		name: {
			fontFamily: sharedStyles.typography.primaryFont,
			fontSize,
			textAlign: 'center',
			textTransform: 'capitalize',
		},
		pokeball: {
			position: 'absolute',
		},
		textContainer: {
			marginTop: 8,
		},
		trigger: {
			fontSize: fontSize * 0.5,
			fontWeight: '700',
			textAlign: 'center',
			textTransform: 'uppercase',
		},
	});
