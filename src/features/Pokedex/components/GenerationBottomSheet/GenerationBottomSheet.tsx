import BottomSheetGradientHandle from '@components/common/BottomSheetGradientHandle';
import { POKEDEX_GENERATION_OPTIONS } from '@constants/pokedex';
import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import GenerationOptionCard from './GenerationOptionCard';
import { useStyles } from './styles';
import { type GenerationBottomSheetProps } from './types';

const GENERATION_SHEET_SNAP_POINT = '80%';

const GenerationBottomSheet = ({
	isOpen,
	selectedOption,
	onClose,
	onOptionPress,
}: GenerationBottomSheetProps) => {
	const styles = useStyles();
	const { t } = useTranslation();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => [GENERATION_SHEET_SNAP_POINT], []);

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
			handleComponent={BottomSheetGradientHandle}
			backgroundStyle={styles.background}
		>
			<BottomSheetScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.contentContainer}
			>
				<Text style={styles.title}>{t('pokedex.generationSheetTitle')}</Text>

				<Text style={styles.description}>{t('pokedex.generationSheetDescription')}</Text>

				<View style={styles.optionsContainer}>
					{POKEDEX_GENERATION_OPTIONS.map(option => {
						const isSelected = selectedOption === option.id;

						return (
							<GenerationOptionCard
								key={option.id}
								option={option}
								isSelected={isSelected}
								onOptionPress={onOptionPress}
							/>
						);
					})}
				</View>
			</BottomSheetScrollView>
		</BottomSheetModal>
	);
};

export default GenerationBottomSheet;
