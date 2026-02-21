import { customColor, textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CreateActionStylesProps = {
	disabled?: boolean;
};

const styles = StyleSheet.create({
	actionButton: {
		alignItems: 'center',
		backgroundColor: customColor.input,
		borderColor: customColor.border,
		borderRadius: 12,
		borderWidth: 1,
		height: 32,
		justifyContent: 'center',
		width: 32,
	},
	clearSearchButton: {
		marginLeft: 8,
	},
	controls: {
		alignItems: 'center',
		columnGap: 8,
		flexDirection: 'row',
	},
	searchInput: {
		color: textColor.black,
		flex: 1,
		fontFamily: sharedStyles.typography.primaryFont,
		fontSize: 13,
		marginLeft: 8,
		paddingBottom: 0,
		paddingTop: 0,
	},
	searchInputContainer: {
		alignItems: 'center',
		backgroundColor: customColor.input,
		borderColor: customColor.border,
		borderRadius: 12,
		borderWidth: 1,
		flex: 1,
		flexDirection: 'row',
		height: 36,
		paddingHorizontal: 12,
	},
});

export const useStyles = () => {
	const { top } = useSafeAreaInsets();

	return StyleSheet.create({
		container: {
			paddingBottom: 12,
			paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding,
			paddingTop: top,
		},
	});
};

export const createActionStyles = ({ disabled }: CreateActionStylesProps) =>
	StyleSheet.create({
		actionButtonState: {
			opacity: disabled ? 0.35 : 1,
		},
	});

export default styles;
