import HeightMediumIcon from '@assets/icons/filter/height-medium.svg';
import HeightShortIcon from '@assets/icons/filter/height-short.svg';
import HeightTallIcon from '@assets/icons/filter/height-tall.svg';
import WeightHeavyIcon from '@assets/icons/filter/weight-heavy.svg';
import WeightLightIcon from '@assets/icons/filter/weight-light.svg';
import WeightNormalIcon from '@assets/icons/filter/weight-normal.svg';
import PokemonTypeIcon from '@components/PokemonTypeIcon';
import { textColor, typeColors } from '@constants/colors';
import {
	MAX_POKEMON_NUMBER,
	MIN_POKEMON_NUMBER,
	POKEDEX_FILTER_HEIGHT_OPTIONS,
	POKEDEX_FILTER_TYPE_OPTIONS,
	POKEDEX_FILTER_WEAKNESS_OPTIONS,
	POKEDEX_FILTER_WEIGHT_OPTIONS,
} from '@constants/pokedex';
import { sharedStyles } from '@constants/sharedStyles';
import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetScrollView,
	type BottomSheetScrollViewMethods,
	BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import texts from '@utils/texts.json';
import { type ComponentType, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { type PokedexHeightOption, type PokedexWeightOption } from '@/src/types';
import { isAndroid } from '@/src/utils/helpers';

import { getIsRangeMaxedOut } from '../../helpers';
import NumberRangeSlider from './components/NumberRangeSlider';
import styles from './styles';
import { type FilterBottomSheetProps } from './types';

const FILTER_SHEET_SNAP_POINT = '92%';
const GLYPH_SIZE = 25;

const sanitizeNumericValue = (value: string) => value.replace(/[^0-9]/g, '');
const clampNumber = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

const HEIGHT_GLYPHS: Record<PokedexHeightOption, ComponentType<SvgProps>> = {
	short: HeightShortIcon,
	medium: HeightMediumIcon,
	tall: HeightTallIcon,
};

const WEIGHT_GLYPHS: Record<PokedexWeightOption, ComponentType<SvgProps>> = {
	light: WeightLightIcon,
	normal: WeightNormalIcon,
	heavy: WeightHeavyIcon,
};

const FilterBottomSheet = ({
	draftState,
	isOpen,
	numberRangeDefaults,
	onApply,
	onClose,
	onHeightOptionPress,
	onNumberRangeChange,
	onReset,
	onTypeOptionPress,
	onWeaknessOptionPress,
	onWeightOptionPress,
}: FilterBottomSheetProps) => {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const scrollViewRef = useRef<BottomSheetScrollViewMethods>(null);
	const [minInputValue, setMinInputValue] = useState('');
	const [maxInputValue, setMaxInputValue] = useState('');
	const [isMinInputFocused, setIsMinInputFocused] = useState(false);
	const [isMaxInputFocused, setIsMaxInputFocused] = useState(false);
	const snapPoints = useMemo(() => [FILTER_SHEET_SNAP_POINT], []);

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
		[onClose],
	);

	useEffect(() => {
		if (isOpen) {
			bottomSheetRef.current?.present();
			return;
		}

		bottomSheetRef.current?.dismiss();
	}, [isOpen]);

	const handleMinInputChange = useCallback(
		(value: string) => {
			const sanitizedValue = sanitizeNumericValue(value);
			setMinInputValue(sanitizedValue);
			if (!sanitizedValue) return;

			const parsedMinValue = Number(sanitizedValue);
			const nextMin = clampNumber(
				parsedMinValue,
				numberRangeDefaults.min,
				draftState.numberRange.max,
			);

			onNumberRangeChange({
				min: nextMin,
				max: draftState.numberRange.max,
			});
		},
		[draftState.numberRange.max, numberRangeDefaults.min, onNumberRangeChange],
	);

	const handleMaxInputChange = useCallback(
		(value: string) => {
			const sanitizedValue = sanitizeNumericValue(value);
			setMaxInputValue(sanitizedValue);
			if (!sanitizedValue) return;

			const parsedMaxValue = Number(sanitizedValue);
			const nextMax = clampNumber(
				parsedMaxValue,
				draftState.numberRange.min,
				numberRangeDefaults.max,
			);

			onNumberRangeChange({
				min: draftState.numberRange.min,
				max: nextMax,
			});
		},
		[draftState.numberRange.min, numberRangeDefaults.max, onNumberRangeChange],
	);

	const handleMinInputBlur = useCallback(() => {
		if (!minInputValue) {
			setMinInputValue(`${draftState.numberRange.min}`);
		}
		setIsMinInputFocused(false);
	}, [draftState.numberRange.min, minInputValue]);

	const handleMaxInputBlur = useCallback(() => {
		if (!maxInputValue) {
			setMaxInputValue(`${draftState.numberRange.max}`);
		}
		setIsMaxInputFocused(false);
	}, [draftState.numberRange.max, maxInputValue]);

	const handleMinInputFocus = useCallback(() => {
		setIsMinInputFocused(true);
		setMinInputValue(`${draftState.numberRange.min}`);
	}, [draftState.numberRange.min]);

	const handleMaxInputFocus = useCallback(() => {
		setIsMaxInputFocused(true);
		setMaxInputValue(`${draftState.numberRange.max}`);
	}, [draftState.numberRange.max]);

	const handleMaxRangePress = useCallback(() => {
		onNumberRangeChange({
			min: MIN_POKEMON_NUMBER,
			max: MAX_POKEMON_NUMBER,
		});
		setMinInputValue(`${MIN_POKEMON_NUMBER}`);
		setMaxInputValue(`${MAX_POKEMON_NUMBER}`);
	}, [onNumberRangeChange]);

	const isRangeMaxedOut = getIsRangeMaxedOut({
		range: draftState.numberRange,
		defaultRange: numberRangeDefaults,
	});

	const scrollRangeInputsIntoView = useCallback(() => {
		if (!isAndroid) return;

		requestAnimationFrame(() => {
			scrollViewRef.current?.scrollToEnd({ animated: true });
		});
	}, []);

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
			keyboardBehavior={isAndroid ? 'fillParent' : 'interactive'}
			keyboardBlurBehavior='restore'
			android_keyboardInputMode={isAndroid ? 'adjustPan' : 'adjustResize'}
		>
			<BottomSheetScrollView
				ref={scrollViewRef}
				contentContainerStyle={styles.contentContainer}
				keyboardShouldPersistTaps='handled'
			>
				<View style={styles.sheetSection}>
					<Text style={styles.title}>{texts.pokedex.filterSheetTitle}</Text>
					<Text style={styles.description}>{texts.pokedex.filterSheetDescription}</Text>
				</View>

				<View style={styles.sheetSection}>
					<Text style={styles.sectionTitle}>{texts.pokedex.filterTypesTitle}</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.typeOptionsContent}
					>
						{POKEDEX_FILTER_TYPE_OPTIONS.map(option => {
							const isSelected = draftState.selectedTypes.includes(option.id);
							const optionColor = typeColors[option.id];

							return (
								<TouchableOpacity
									key={option.id}
									testID={option.testID}
									activeOpacity={sharedStyles.opacity.active}
									onPress={() => onTypeOptionPress(option.id)}
									style={[
										styles.optionButton,
										styles.optionButtonUnselected,
										isSelected && { backgroundColor: optionColor, shadowColor: optionColor },
									]}
								>
									<PokemonTypeIcon
										type={option.id}
										size={GLYPH_SIZE}
										fill={isSelected ? textColor.primary : optionColor}
									/>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>

				<View style={styles.sheetSection}>
					<Text style={styles.sectionTitle}>{texts.pokedex.filterWeaknessesTitle}</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.typeOptionsContent}
					>
						{POKEDEX_FILTER_WEAKNESS_OPTIONS.map(option => {
							const isSelected = draftState.selectedWeaknesses.includes(option.id);
							const optionColor = typeColors[option.id];

							return (
								<TouchableOpacity
									key={option.id}
									testID={option.testID}
									activeOpacity={sharedStyles.opacity.active}
									onPress={() => onWeaknessOptionPress(option.id)}
									style={[
										styles.optionButton,
										styles.optionButtonUnselected,
										isSelected && { backgroundColor: optionColor, shadowColor: optionColor },
									]}
								>
									<PokemonTypeIcon
										type={option.id}
										size={GLYPH_SIZE}
										fill={isSelected ? textColor.primary : optionColor}
									/>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>

				<View style={styles.sheetSection}>
					<Text style={styles.sectionTitle}>{texts.pokedex.filterHeightsTitle}</Text>
					<View style={styles.optionGroupRow}>
						{POKEDEX_FILTER_HEIGHT_OPTIONS.map(option => {
							const isSelected = draftState.selectedHeights.includes(option.id);
							const iconColor = isSelected ? textColor.primary : option.color;
							const HeightGlyph = HEIGHT_GLYPHS[option.id];

							return (
								<TouchableOpacity
									key={option.id}
									testID={option.testID}
									activeOpacity={sharedStyles.opacity.active}
									onPress={() => onHeightOptionPress(option.id)}
									style={[
										styles.optionButton,
										styles.optionButtonUnselected,
										isSelected && { backgroundColor: option.color, shadowColor: option.color },
									]}
								>
									<HeightGlyph
										width={GLYPH_SIZE}
										height={GLYPH_SIZE}
										color={iconColor}
									/>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>

				<View style={styles.sheetSection}>
					<Text style={styles.sectionTitle}>{texts.pokedex.filterWeightsTitle}</Text>
					<View style={styles.optionGroupRow}>
						{POKEDEX_FILTER_WEIGHT_OPTIONS.map(option => {
							const isSelected = draftState.selectedWeights.includes(option.id);
							const iconColor = isSelected ? textColor.primary : option.color;
							const WeightGlyph = WEIGHT_GLYPHS[option.id];

							return (
								<TouchableOpacity
									key={option.id}
									testID={option.testID}
									activeOpacity={sharedStyles.opacity.active}
									onPress={() => onWeightOptionPress(option.id)}
									style={[
										styles.optionButton,
										styles.optionButtonUnselected,
										isSelected && { backgroundColor: option.color, shadowColor: option.color },
									]}
								>
									<WeightGlyph
										width={GLYPH_SIZE}
										height={GLYPH_SIZE}
										color={iconColor}
									/>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>

				<View style={styles.numberRangeContainer}>
					<Text style={styles.sectionTitle}>{texts.pokedex.filterNumberRangeTitle}</Text>
					<View style={styles.numberRangeInputsRow}>
						<BottomSheetTextInput
							testID='pokedex-filter-min-input'
							value={isMinInputFocused ? minInputValue : `${draftState.numberRange.min}`}
							onChangeText={handleMinInputChange}
							onFocus={() => {
								handleMinInputFocus();
								scrollRangeInputsIntoView();
							}}
							onBlur={handleMinInputBlur}
							keyboardType='number-pad'
							returnKeyType='done'
							maxLength={4}
							selectTextOnFocus
							submitBehavior='blurAndSubmit'
							placeholder='Min'
							placeholderTextColor={textColor.grey}
							style={styles.numberRangeInput}
						/>

						<BottomSheetTextInput
							testID='pokedex-filter-max-input'
							value={isMaxInputFocused ? maxInputValue : `${draftState.numberRange.max}`}
							onChangeText={handleMaxInputChange}
							onFocus={() => {
								handleMaxInputFocus();
								scrollRangeInputsIntoView();
							}}
							onBlur={handleMaxInputBlur}
							keyboardType='number-pad'
							returnKeyType='done'
							maxLength={4}
							selectTextOnFocus
							submitBehavior='blurAndSubmit'
							placeholder='Max'
							placeholderTextColor={textColor.grey}
							style={styles.numberRangeInput}
						/>

						<TouchableOpacity
							testID='pokedex-filter-max-range-button'
							activeOpacity={sharedStyles.opacity.active}
							onPress={handleMaxRangePress}
							style={[
								styles.numberRangeMaxButton,
								isRangeMaxedOut && styles.numberRangeMaxButtonDisabled,
							]}
							disabled={isRangeMaxedOut}
						>
							<Text
								style={[
									styles.numberRangeMaxButtonLabel,
									isRangeMaxedOut && { color: textColor.grey },
								]}
							>
								{texts.pokedex.filterMaxRangeButton}
							</Text>
						</TouchableOpacity>
					</View>

					<NumberRangeSlider
						range={draftState.numberRange}
						min={numberRangeDefaults.min}
						max={numberRangeDefaults.max}
						isRangeMaxedOut={isRangeMaxedOut}
					/>
				</View>

				<View style={styles.actionButtonsRow}>
					<TouchableOpacity
						testID='pokedex-filter-reset-button'
						activeOpacity={sharedStyles.opacity.active}
						onPress={onReset}
						style={[sharedStyles.actionButton, styles.actionButtonReset]}
					>
						<Text style={[styles.actionButtonLabel, styles.actionButtonResetLabel]}>
							{texts.pokedex.filterResetButton}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						testID='pokedex-filter-apply-button'
						activeOpacity={sharedStyles.opacity.active}
						onPress={onApply}
						style={[sharedStyles.actionButton, styles.actionButtonApply]}
					>
						<Text style={[styles.actionButtonLabel, styles.actionButtonApplyLabel]}>
							{texts.pokedex.filterApplyButton}
						</Text>
					</TouchableOpacity>
				</View>
			</BottomSheetScrollView>
		</BottomSheetModal>
	);
};

export default FilterBottomSheet;
