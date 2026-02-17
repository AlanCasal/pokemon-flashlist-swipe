import { POKEDEX_GENERATION_OPTIONS } from '@constants/pokedex';
import { sharedStyles } from '@constants/sharedStyles';
import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import texts from '@utils/texts.json';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Text, View } from 'react-native';

import GenerationOptionCard from './GenerationOptionCard';
import styles from './styles';
import { type GenerationBottomSheetProps } from './types';

const GENERATION_SHEET_SNAP_POINT = '80%';

const GenerationBottomSheet = ({
	isOpen,
	selectedOption,
	onClose,
	onOptionPress,
}: GenerationBottomSheetProps) => {
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
				<View
					className='absolute inset-0'
					style={styles.backdropOverlay}
				/>
			</BottomSheetBackdrop>
		),
		[onClose],
	);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		isOpen ? bottomSheetRef.current?.present() : bottomSheetRef.current?.dismiss();
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
			<BottomSheetScrollView
				className='pt-1.5'
				contentContainerStyle={[
					styles.contentContainer,
					{ paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding },
				]}
			>
				<Text
					className='text-center font-bold'
					style={styles.title}
				>
					{texts.pokedex.generationSheetTitle}
				</Text>

				<Text
					className='mt-3 leading-5'
					style={[styles.description, { fontFamily: sharedStyles.typography.primaryFont }]}
				>
					{texts.pokedex.generationSheetDescription}
				</Text>

				<View
					className='mt-4 flex-row flex-wrap justify-between'
					style={styles.optionsContainer}
				>
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
