import { customColor, textColor, typeColors } from '@constants/colors';
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
				<View
					className='absolute inset-0'
					style={{
						backgroundColor: `rgba(23, 23, 27, ${sharedStyles.pokedex.sortSheet.backdropOpacity})`,
					}}
				/>
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
			handleIndicatorStyle={{
				width: sharedStyles.pokedex.sortSheet.handleWidth,
				height: sharedStyles.pokedex.sortSheet.handleHeight,
				backgroundColor: textColor.primary,
			}}
			backgroundStyle={{
				borderTopLeftRadius: sharedStyles.pokedex.sortSheet.cornerRadius,
				borderTopRightRadius: sharedStyles.pokedex.sortSheet.cornerRadius,
				backgroundColor: textColor.primary,
			}}
		>
			<BottomSheetView
				className='gap-3 pt-1.5 pb-7'
				style={{
					paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding,
				}}
			>
				<Text
					className='text-center font-bold'
					style={{
						color: textColor.black,
						fontSize: sharedStyles.pokedex.sortText.titleFontSize,
					}}
				>
					{texts.pokedex.sortSheetTitle}
				</Text>

				<Text
					className='leading-5'
					style={{
						fontFamily: sharedStyles.typography.primaryFont,
						color: textColor.grey,
						fontSize: sharedStyles.pokedex.sortText.descriptionFontSize,
						lineHeight: 20,
					}}
				>
					{texts.pokedex.sortSheetDescription}
				</Text>

				<View className='gap-2.5'>
					{POKEDEX_SORT_OPTIONS.map(option => {
						const isSelected = selectedOption === option.id;

						return (
							<TouchableOpacity
								key={option.id}
								testID={option.testID}
								activeOpacity={sharedStyles.opacity.active}
								onPress={() => onOptionPress(option.id)}
								className='items-center justify-center px-4'
								style={{
									height: sharedStyles.pokedex.sortOption.height,
									borderRadius: sharedStyles.pokedex.sortOption.borderRadius,
									backgroundColor: isSelected ? typeColors.dragon : customColor.input,
								}}
							>
								<Text
									numberOfLines={1}
									adjustsFontSizeToFit
									minimumFontScale={0.8}
									className='w-full text-center'
									style={{
										color: isSelected ? textColor.primary : textColor.grey,
										fontSize: sharedStyles.pokedex.sortOption.fontSize,
									}}
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
