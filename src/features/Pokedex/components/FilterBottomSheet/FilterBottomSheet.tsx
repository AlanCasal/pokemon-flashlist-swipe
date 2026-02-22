import HeightMediumIcon from '@assets/icons/filter/height-medium.svg';
import HeightShortIcon from '@assets/icons/filter/height-short.svg';
import HeightTallIcon from '@assets/icons/filter/height-tall.svg';
import WeightHeavyIcon from '@assets/icons/filter/weight-heavy.svg';
import WeightLightIcon from '@assets/icons/filter/weight-light.svg';
import WeightNormalIcon from '@assets/icons/filter/weight-normal.svg';
import PokemonTypeIcon from '@components/PokemonTypeIcon';
import { textColor, typeColors } from '@constants/colors';
import {
	POKEDEX_FILTER_HEIGHT_OPTIONS,
	POKEDEX_FILTER_TYPE_OPTIONS,
	POKEDEX_FILTER_WEAKNESS_OPTIONS,
	POKEDEX_FILTER_WEIGHT_OPTIONS,
} from '@constants/pokedex';
import { sharedStyles } from '@constants/sharedStyles';
import {
	BottomSheetModal,
	BottomSheetScrollView,
	BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import texts from '@utils/texts.json';
import { type ComponentType, useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { type PokedexHeightOption, type PokedexWeightOption } from '@/src/types';
import { isAndroid } from '@/src/utils/helpers';

import NumberRangeSlider from './components/NumberRangeSlider';
import styles from './styles';
import { type FilterBottomSheetProps } from './types';
import { useFilterBottomSheetController } from './useFilterBottomSheetController';

const GLYPH_SIZE = 25;

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
	const {
		bottomSheetRef,
		scrollViewRef,
		snapPoints,
		renderBackdrop,
		selectedTypeIds,
		selectedWeaknessIds,
		selectedHeightIds,
		selectedWeightIds,
		minInputDisplayValue,
		maxInputDisplayValue,
		handleMinInputChange,
		handleMaxInputChange,
		handleMinInputBlur,
		handleMaxInputBlur,
		handleMinInputFocusAndScroll,
		handleMaxInputFocusAndScroll,
		handleMaxRangePress,
		isRangeMaxedOut,
	} = useFilterBottomSheetController({
		draftState,
		isOpen,
		numberRangeDefaults,
		onClose,
		onNumberRangeChange,
	});

	const typeOptions = useMemo(
		() =>
			POKEDEX_FILTER_TYPE_OPTIONS.map(option => {
				const isSelected = selectedTypeIds.has(option.id);
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
			}),
		[onTypeOptionPress, selectedTypeIds],
	);

	const weaknessOptions = useMemo(
		() =>
			POKEDEX_FILTER_WEAKNESS_OPTIONS.map(option => {
				const isSelected = selectedWeaknessIds.has(option.id);
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
			}),
		[onWeaknessOptionPress, selectedWeaknessIds],
	);

	const heightOptions = useMemo(
		() =>
			POKEDEX_FILTER_HEIGHT_OPTIONS.map(option => {
				const isSelected = selectedHeightIds.has(option.id);
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
			}),
		[onHeightOptionPress, selectedHeightIds],
	);

	const weightOptions = useMemo(
		() =>
			POKEDEX_FILTER_WEIGHT_OPTIONS.map(option => {
				const isSelected = selectedWeightIds.has(option.id);
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
			}),
		[onWeightOptionPress, selectedWeightIds],
	);

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
						{typeOptions}
					</ScrollView>
				</View>

				<View style={styles.sheetSection}>
					<Text style={styles.sectionTitle}>{texts.pokedex.filterWeaknessesTitle}</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.typeOptionsContent}
					>
						{weaknessOptions}
					</ScrollView>
				</View>

				<View style={styles.sheetSection}>
					<Text style={styles.sectionTitle}>{texts.pokedex.filterHeightsTitle}</Text>
					<View style={styles.optionGroupRow}>{heightOptions}</View>
				</View>

				<View style={styles.sheetSection}>
					<Text style={styles.sectionTitle}>{texts.pokedex.filterWeightsTitle}</Text>
					<View style={styles.optionGroupRow}>{weightOptions}</View>
				</View>

				<View style={styles.numberRangeContainer}>
					<Text style={styles.sectionTitle}>{texts.pokedex.filterNumberRangeTitle}</Text>
					<View style={styles.numberRangeInputsRow}>
						<BottomSheetTextInput
							testID='pokedex-filter-min-input'
							value={minInputDisplayValue}
							onChangeText={handleMinInputChange}
							onFocus={handleMinInputFocusAndScroll}
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
							value={maxInputDisplayValue}
							onChangeText={handleMaxInputChange}
							onFocus={handleMaxInputFocusAndScroll}
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
									isRangeMaxedOut && styles.numberRangeMaxButtonLabelDisabled,
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
