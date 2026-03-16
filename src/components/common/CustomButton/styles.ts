import { pokeballColors, textColor } from '@constants/colors';
import { usePrimaryFontFamily } from '@hooks/usePrimaryFontFamily';
import { StyleSheet } from 'react-native';

type UseStylesProps = {
	backgroundColor?: string;
	borderColor?: string;
	disabled?: boolean;
	textColor?: string;
};

export const useStyles = ({
	backgroundColor = pokeballColors.red,
	borderColor = pokeballColors.black,
	disabled = false,
	textColor: labelColor = textColor.light,
}: UseStylesProps) => {
	const primaryFont = usePrimaryFontFamily();

	return StyleSheet.create({
		button: {
			alignItems: 'center',
			backgroundColor,
			borderColor,
			borderRadius: 999,
			borderWidth: 2,
			flexDirection: 'row',
			gap: 8,
			justifyContent: 'center',
			minHeight: 48,
			opacity: disabled ? 0.7 : 1,
			paddingHorizontal: 20,
			paddingVertical: 10,
		},
		label: {
			color: labelColor,
			fontFamily: primaryFont,
			fontSize: 18,
			lineHeight: 22,
			textAlign: 'center',
		},
	});
};
