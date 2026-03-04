import BottomSheetGradientHandle from '@components/common/BottomSheetGradientHandle';
import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { getLanguageLabel, SUPPORTED_LANGUAGES } from '@/src/i18n/language';
import {
	useLanguagePreference,
	useResolvedLanguage,
	useSetLanguagePreference,
} from '@/src/store/languageStore';

import { useStyles } from './styles';

const MENU_ICON_SIZE = 24;

const LanguageSwitcher = () => {
	const styles = useStyles();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const snapPoints = useMemo(() => ['45%'], []);
	const { t } = useTranslation();
	const languagePreference = useLanguagePreference();
	const resolvedLanguage = useResolvedLanguage();
	const setLanguagePreference = useSetLanguagePreference();

	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				pressBehavior='close'
			>
				<View style={styles.backdropFill} />
			</BottomSheetBackdrop>
		),
		[styles.backdropFill],
	);

	const toggleSheet = useCallback(() => {
		if (isSheetOpen) {
			bottomSheetRef.current?.dismiss();
			return;
		}

		bottomSheetRef.current?.present();
	}, [isSheetOpen]);

	const handleLanguagePress = useCallback(
		(nextLanguage: (typeof SUPPORTED_LANGUAGES)[number]) => {
			setLanguagePreference(nextLanguage);
			bottomSheetRef.current?.dismiss();
		},
		[setLanguagePreference],
	);

	const languageOptions = useMemo(() => [...SUPPORTED_LANGUAGES], []);

	return (
		<>
			<View
				pointerEvents='box-none'
				style={styles.fabContainer}
			>
				<TouchableOpacity
					testID='language-switcher-fab'
					accessibilityRole='button'
					accessibilityLabel={t('language.fabA11y')}
					activeOpacity={sharedStyles.opacity.active}
					onPress={toggleSheet}
					style={styles.fabButton}
				>
					<MaterialCommunityIcons
						name='menu'
						size={MENU_ICON_SIZE}
						color={textColor.light}
					/>
				</TouchableOpacity>
			</View>

			<BottomSheetModal
				ref={bottomSheetRef}
				index={0}
				snapPoints={snapPoints}
				enablePanDownToClose
				handleComponent={BottomSheetGradientHandle}
				backgroundStyle={styles.background}
				backdropComponent={renderBackdrop}
				onChange={index => setIsSheetOpen(index >= 0)}
				onDismiss={() => setIsSheetOpen(false)}
			>
				<BottomSheetView style={styles.contentContainer}>
					<Text style={styles.title}>{t('language.sheetTitle')}</Text>

					<View style={styles.optionsContainer}>
						{languageOptions.map(option => {
							const isSelected =
								languagePreference === option ||
								(languagePreference === 'system' && resolvedLanguage === option);
							const label = getLanguageLabel(option);

							return (
								<TouchableOpacity
									key={option}
									testID={`language-switcher-option-${option}`}
									activeOpacity={sharedStyles.opacity.active}
									onPress={() => handleLanguagePress(option)}
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
				</BottomSheetView>
			</BottomSheetModal>
		</>
	);
};

export default LanguageSwitcher;
