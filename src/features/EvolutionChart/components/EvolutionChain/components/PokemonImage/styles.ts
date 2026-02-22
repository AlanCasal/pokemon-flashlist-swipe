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
			fontSize,
			fontWeight: '700',
			lineHeight: fontSize + 4,
			textAlign: 'center',
			textTransform: 'capitalize',
		},
		pokeball: {
			position: 'absolute',
		},
		textContainer: {
			marginTop: 6,
		},
		trigger: {
			fontSize: fontSize * 0.65,
			fontWeight: '700',
			marginBottom: 3,
			textAlign: 'center',
		},
	});
