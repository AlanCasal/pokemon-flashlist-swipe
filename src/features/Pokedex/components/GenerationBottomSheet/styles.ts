import { textColor } from '@constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	backdropOverlay: {
		backgroundColor: 'rgba(23, 23, 27, 0.5)',
	},
	background: {
		backgroundColor: textColor.primary,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	contentContainer: {
		paddingBottom: 24,
	},
	description: {
		color: textColor.grey,
		fontSize: 14,
		lineHeight: 20,
	},
	handleIndicator: {
		backgroundColor: textColor.primary,
		height: 6,
		width: 80,
	},
	inactiveOpacity: {
		opacity: 0.3,
	},
	optionCard: {
		borderRadius: 16,
		height: 140,
	},
	optionDotsDecoration: {
		left: -80,
		opacity: 0.15,
		top: -50,
	},
	optionLabel: {
		fontSize: 16,
	},
	optionPokeballDecoration: {
		bottom: -35,
		opacity: 0.15,
		right: -8,
	},
	optionSprite: {
		height: 60,
		marginHorizontal: -4,
		width: 60,
		zIndex: 1,
	},
	optionsContainer: {
		rowGap: 12,
	},
	title: {
		color: textColor.black,
		fontSize: 28,
	},
});

export default styles;
