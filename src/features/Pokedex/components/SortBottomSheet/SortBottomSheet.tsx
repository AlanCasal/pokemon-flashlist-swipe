import { textColor, typeColors } from '@constants/colors';
import {
	POKEDEX_SORT_OPTIONS,
	SORT_DESCRIPTION_FONT_SIZE,
	SORT_OPTION_BORDER_RADIUS,
	SORT_OPTION_FONT_SIZE,
	SORT_OPTION_HEIGHT,
	SORT_SHEET_BACKDROP_OPACITY,
	SORT_SHEET_CORNER_RADIUS,
	SORT_SHEET_HANDLE_HEIGHT,
	SORT_SHEET_HANDLE_WIDTH,
	SORT_SHEET_SNAP_POINT,
	SORT_TITLE_FONT_SIZE,
} from '@constants/pokedex';
import { ACTIVE_OPACITY, PRIMARY_FONT, SCREEN_HORIZONTAL_PADDING } from '@constants/sharedStyles';
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
				<View
					className='absolute inset-0'
					style={{
						backgroundColor: `rgba(23, 23, 27, ${SORT_SHEET_BACKDROP_OPACITY})`,
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
				width: SORT_SHEET_HANDLE_WIDTH,
				height: SORT_SHEET_HANDLE_HEIGHT,
				backgroundColor: '#FFFFFF',
			}}
			backgroundStyle={{
				borderTopLeftRadius: SORT_SHEET_CORNER_RADIUS,
				borderTopRightRadius: SORT_SHEET_CORNER_RADIUS,
				backgroundColor: '#FFFFFF',
			}}
		>
			<BottomSheetView
				className='gap-3 pt-1.5 pb-7'
				style={{
					paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
				}}
			>
				<Text
					className='text-center font-bold'
					style={{
						color: textColor.black,
						fontSize: SORT_TITLE_FONT_SIZE,
					}}
				>
					{texts.pokedex.sortSheetTitle}
				</Text>

				<Text
					className='leading-5'
					style={{
						fontFamily: PRIMARY_FONT,
						color: textColor.grey,
						fontSize: SORT_DESCRIPTION_FONT_SIZE,
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
								activeOpacity={ACTIVE_OPACITY}
								onPress={() => onOptionPress(option.id)}
								className='items-center justify-center px-4'
								style={{
									height: SORT_OPTION_HEIGHT,
									borderRadius: SORT_OPTION_BORDER_RADIUS,
									backgroundColor: isSelected ? typeColors.dragon : '#F2F2F2',
								}}
							>
								<Text
									numberOfLines={1}
									adjustsFontSizeToFit
									minimumFontScale={0.8}
									className='w-full text-center'
									style={{
										color: isSelected ? '#FFFFFF' : textColor.grey,
										fontSize: SORT_OPTION_FONT_SIZE,
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
