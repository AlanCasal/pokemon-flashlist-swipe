import { POKEDEX_SORT_OPTIONS } from '@constants/pokedex';
import { sharedStyles } from '@constants/sharedStyles';
import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import texts from '@utils/texts.json';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { type SortBottomSheetProps } from './types';

const SortBottomSheet = ({
	isOpen,
	selectedOption,
	onClose,
	onOptionPress,
}: SortBottomSheetProps) => {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => [sharedStyles.pokedex.sortSheet.snapPoint], []);

	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				pressBehavior='close'
				onPress={onClose}
			>
				<View style={[styles.backdropFill, styles.backdropOverlay]} />
			</BottomSheetBackdrop>
		),
		[onClose],
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
				<Text style={styles.title}>{texts.pokedex.sortSheetTitle}</Text>

				<Text style={styles.description}>{texts.pokedex.sortSheetDescription}</Text>

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
									{option.label}
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
