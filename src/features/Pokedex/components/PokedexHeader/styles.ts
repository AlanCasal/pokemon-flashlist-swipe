import { customColor, textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { StyleSheet } from 'react-native';

type UseStylesProps = {
	topInset: number;
};

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
	sortBadge: {
		alignItems: 'center',
		backgroundColor: typeColors.fighting,
		borderRadius: sharedStyles.pokedex.sortBadge.size / 2,
		height: sharedStyles.pokedex.sortBadge.size,
		justifyContent: 'center',
		position: 'absolute',
		right: -4,
		top: -4,
		width: sharedStyles.pokedex.sortBadge.size,
	},
	sortBadgeLabel: {
		color: textColor.primary,
		fontFamily: sharedStyles.typography.primaryFont,
		fontSize: sharedStyles.pokedex.sortBadge.fontSize,
		lineHeight: sharedStyles.pokedex.sortBadge.size - 1,
		textAlign: 'center',
	},
});

export const useStyles = ({ topInset }: UseStylesProps) =>
	StyleSheet.create({
		container: {
			paddingBottom: 12,
			paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding,
			paddingTop: topInset,
		},
	});

export const createActionStyles = ({ disabled }: CreateActionStylesProps) =>
	StyleSheet.create({
		actionButtonState: {
			opacity: disabled ? sharedStyles.pokedex.sortBadge.disabledOpacity : 1,
		},
	});

export default styles;
