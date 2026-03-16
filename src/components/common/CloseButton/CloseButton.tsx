import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import { useStyles } from './styles';
import type { CloseButtonProps } from './types';

const {
	opacity: { active: activeOpacity },
} = sharedStyles;

const DEFAULT_ICON_SIZE = 24;

const CloseButton = ({
	accessibilityLabel,
	containerStyle,
	iconColor = textColor.dark,
	iconSize = DEFAULT_ICON_SIZE,
	onPress,
	testID,
}: CloseButtonProps) => {
	const styles = useStyles();

	return (
		<TouchableOpacity
			testID={testID}
			accessibilityRole='button'
			accessibilityLabel={accessibilityLabel}
			onPress={onPress}
			style={[styles.closeButton, containerStyle]}
			activeOpacity={activeOpacity}
		>
			<MaterialCommunityIcons
				name='close'
				size={iconSize}
				color={iconColor}
			/>
		</TouchableOpacity>
	);
};

export default CloseButton;
