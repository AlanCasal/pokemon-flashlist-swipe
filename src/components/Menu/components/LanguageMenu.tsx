import BackButton from '@components/common/BackButton';
import CloseButton from '@components/common/CloseButton';
import { sharedStyles } from '@constants/sharedStyles';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { getLanguageFlagEmoji, getLanguageLabel, SUPPORTED_LANGUAGES } from '@/src/i18n/language';
import { useLanguagePreference, useResolvedLanguage } from '@/src/store/languageStore';

import type { LanguageMenuProps } from '../types';
import { useStyles } from '../useStyles';

const LanguageMenu = ({ onBack, onClose, onLanguagePress }: LanguageMenuProps) => {
	const styles = useStyles();
	const { t } = useTranslation();
	const languagePreference = useLanguagePreference();
	const resolvedLanguage = useResolvedLanguage();

	return (
		<>
			<View style={styles.headerRow}>
				<BackButton
					testID='language-switcher-back-button'
					accessibilityLabel={t('menu.backButton')}
					onPress={onBack}
					containerStyle={styles.headerLeftButton}
					iconColor={styles.title.color}
					iconSize={24}
					variant='inline'
				/>

				<Text style={styles.title}>{t('menu.languages')}</Text>

				<CloseButton
					testID='language-switcher-close-button'
					accessibilityLabel={t('menu.closeButton')}
					onPress={onClose}
					containerStyle={styles.headerRightButton}
				/>
			</View>

			<View style={styles.optionsContainer}>
				{SUPPORTED_LANGUAGES.map(option => {
					const isSelected =
						languagePreference === option ||
						(languagePreference === 'system' && resolvedLanguage === option);
					const label = `${getLanguageFlagEmoji(option)} ${getLanguageLabel(option)}`;

					return (
						<TouchableOpacity
							key={option}
							testID={`language-switcher-option-${option}`}
							activeOpacity={sharedStyles.opacity.active}
							onPress={() => onLanguagePress(option)}
							style={[
								styles.optionButton,
								isSelected ? styles.optionButtonSelected : styles.optionButtonUnselected,
							]}
						>
							<Text
								style={[
									styles.optionLabel,
									isSelected ? styles.optionLabelSelected : styles.optionLabelUnselected,
								]}
							>
								{label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</>
	);
};

export default LanguageMenu;
