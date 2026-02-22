import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import { useStyles } from './styles';
import type { BackButtonProps } from './types';

const {
	opacity: { active: activeOpacity },
} = sharedStyles;

const DEFAULT_ICON_SIZE = 26;

const BackButton = ({
	containerStyle,
	iconColor = textColor.light,
	iconSize = DEFAULT_ICON_SIZE,
	onPress,
}: BackButtonProps) => {
	const router = useRouter();
	const styles = useStyles();

	const onBackButtonPress = useCallback(() => {
		if (onPress) {
			onPress();
			return;
		}

		router.back();
	}, [onPress, router]);

	return (
		<TouchableOpacity
			onPress={onBackButtonPress}
			style={[styles.backButton, containerStyle]}
			activeOpacity={activeOpacity}
		>
			<MaterialCommunityIcons
				name='arrow-left'
				size={iconSize}
				color={iconColor}
			/>
		</TouchableOpacity>
	);
};

export default BackButton;
