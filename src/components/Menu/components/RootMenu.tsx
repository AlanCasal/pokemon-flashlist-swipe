import CloseButton from '@components/common/CloseButton';
import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import type { RootMenuProps } from '../types';
import { useStyles } from '../useStyles';
import SignOutButton from './SignOutButton';

const MENU_ICON_SIZE = 24;

const RootMenu = ({
	isSigningOut,
	onClose,
	onOpenProfile,
	onOpenLanguagesMenu,
	showProfile = true,
	onSignOut,
	showSignOut = true,
}: RootMenuProps) => {
	const styles = useStyles();
	const { t } = useTranslation();

	return (
		<>
			<View style={styles.headerRow}>
				<View style={styles.headerSpacer} />

				<Text style={styles.title}>{t('menu.title')}</Text>

				<CloseButton
					testID='language-switcher-close-button'
					accessibilityLabel={t('menu.closeButton')}
					onPress={onClose}
					containerStyle={styles.headerRightButton}
				/>
			</View>

			{showProfile ? (
				<TouchableOpacity
					testID='language-switcher-menu-profile'
					accessibilityRole='button'
					activeOpacity={sharedStyles.opacity.active}
					onPress={onOpenProfile}
					style={styles.menuButton}
				>
					<View style={styles.menuButtonContent}>
						<MaterialCommunityIcons
							name='account-circle-outline'
							size={MENU_ICON_SIZE}
							color={textColor.dark}
						/>

						<Text style={styles.menuButtonLabel}>{t('profile.title')}</Text>
					</View>

					<MaterialCommunityIcons
						name='chevron-right'
						size={MENU_ICON_SIZE}
						color={textColor.dark}
					/>
				</TouchableOpacity>
			) : null}

			<TouchableOpacity
				testID='language-switcher-menu-languages'
				accessibilityRole='button'
				activeOpacity={sharedStyles.opacity.active}
				onPress={onOpenLanguagesMenu}
				style={styles.menuButton}
			>
				<View style={styles.menuButtonContent}>
					<MaterialCommunityIcons
						name='translate'
						size={MENU_ICON_SIZE}
						color={textColor.dark}
					/>

					<Text style={styles.menuButtonLabel}>{t('menu.languages')}</Text>
				</View>

				<MaterialCommunityIcons
					name='chevron-right'
					size={MENU_ICON_SIZE}
					color={textColor.dark}
				/>
			</TouchableOpacity>

			{showSignOut ? (
				<SignOutButton
					disabled={isSigningOut}
					onPress={onSignOut}
				/>
			) : null}
		</>
	);
};

export default RootMenu;
