import { pokeballColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import type { SignOutButtonProps } from '../types';
import { useStyles } from '../useStyles';

const MENU_ICON_SIZE = 24;

const SignOutButton = ({ disabled, onPress }: SignOutButtonProps) => {
	const styles = useStyles();
	const { t } = useTranslation();

	return (
		<TouchableOpacity
			testID='language-switcher-menu-sign-out'
			accessibilityRole='button'
			activeOpacity={sharedStyles.opacity.active}
			disabled={disabled}
			onPress={onPress}
			style={[styles.menuButton, disabled && styles.signOutButtonDisabled]}
		>
			<View style={styles.menuButtonContent}>
				<MaterialCommunityIcons
					name='logout'
					size={MENU_ICON_SIZE}
					color={pokeballColors.red}
				/>

				<Text style={[styles.menuButtonLabel, styles.menuButtonLabelDestructive]}>
					{t('menu.signOut')}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default SignOutButton;
