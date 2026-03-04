import { POKEDEX_SORT_OPTIONS } from '@constants/pokedex';
import { sharedStyles } from '@constants/sharedStyles';
import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { useStyles } from './styles';
import { type SortBottomSheetProps } from './types';

const SORT_SHEET_SNAP_POINT = '58%';

const SortBottomSheet = ({
	isOpen,
	selectedOption,
	onClose,
	onOptionPress,
}: SortBottomSheetProps) => {
	const styles = useStyles();
	const { t } = useTranslation();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => [SORT_SHEET_SNAP_POINT], []);

	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				pressBehavior='close'
				onPress={onClose}
			>
				<View style={styles.backdropFill} />
			</BottomSheetBackdrop>
		),
		[onClose, styles.backdropFill],
	);

	useEffect(() => {
		if (isOpen) {
			bottomSheetRef.current?.present();
			return;
		}

		bottomSheetRef.current?.dismiss();
	}, [isOpen]);

	return (
		<BottomSheetModal
			ref={bottomSheetRef}
			index={0}
			snapPoints={snapPoints}
			enablePanDownToClose
			backdropComponent={renderBackdrop}
			onDismiss={onClose}
			handleIndicatorStyle={styles.handleIndicator}
			backgroundStyle={styles.background}
		>
			<BottomSheetView style={styles.contentContainer}>
				<Text style={styles.title}>{t('pokedex.sortSheetTitle')}</Text>

				<Text style={styles.description}>{t('pokedex.sortSheetDescription')}</Text>

				<View style={styles.optionsContainer}>
					{POKEDEX_SORT_OPTIONS.map(option => {
						const isSelected = selectedOption === option.id;
						const optionButtonStateStyle = isSelected
							? styles.optionButtonSelected
							: styles.optionButtonUnselected;
						const optionLabelStateStyle = isSelected
							? styles.optionLabelSelected
							: styles.optionLabelUnselected;

						return (
							<TouchableOpacity
								key={option.id}
								testID={option.testID}
								activeOpacity={sharedStyles.opacity.active}
								onPress={() => onOptionPress(option.id)}
								style={[styles.optionButton, optionButtonStateStyle]}
							>
								<Text
									numberOfLines={1}
									adjustsFontSizeToFit
									minimumFontScale={0.8}
									style={[styles.optionLabel, optionLabelStateStyle]}
								>
									{t(`pokedex.sortOptions.${option.id}`)}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			</BottomSheetView>
		</BottomSheetModal>
	);
};

export default SortBottomSheet;
