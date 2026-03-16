import CloseButton from '@components/common/CloseButton';
import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { useStyles } from '../styles';
import type { RootMenuProps } from '../types';

const MENU_ICON_SIZE = 24;

const RootMenu = ({ onClose, onOpenLanguagesMenu }: RootMenuProps) => {
	const styles = useStyles();
	const { t } = useTranslation();

	return (
		<>
			<View style={styles.headerRow}>
				<View style={styles.headerSpacer} />

				<Text style={styles.title}>{t('language.menuTitle')}</Text>

				<CloseButton
					testID='language-switcher-close-button'
					accessibilityLabel={t('language.closeButton')}
					onPress={onClose}
					containerStyle={styles.headerRightButton}
				/>
			</View>

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

					<Text style={styles.menuButtonLabel}>{t('language.sheetTitle')}</Text>
				</View>

				<MaterialCommunityIcons
					name='chevron-right'
					size={MENU_ICON_SIZE}
					color={textColor.dark}
				/>
			</TouchableOpacity>
		</>
	);
};

export default RootMenu;
