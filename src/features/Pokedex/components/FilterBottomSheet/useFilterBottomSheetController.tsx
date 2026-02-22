import { MAX_POKEMON_NUMBER, MIN_POKEMON_NUMBER } from '@constants/pokedex';
import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	type BottomSheetModal,
	type BottomSheetScrollViewMethods,
} from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';

import { isAndroid } from '@/src/utils/helpers';

import { getIsRangeMaxedOut } from '../../helpers';
import {
	getNextRangeFromMaxInput,
	getNextRangeFromMinInput,
	sanitizeNumericValue,
} from './helpers';
import styles from './styles';
import { type FilterBottomSheetProps } from './types';

const FILTER_SHEET_SNAP_POINT = '92%';

export const useFilterBottomSheetController = ({
	draftState,
	isOpen,
	numberRangeDefaults,
	onClose,
	onNumberRangeChange,
}: Pick<
	FilterBottomSheetProps,
	'draftState' | 'isOpen' | 'numberRangeDefaults' | 'onClose' | 'onNumberRangeChange'
>) => {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const scrollViewRef = useRef<BottomSheetScrollViewMethods>(null);
	const [minInputValue, setMinInputValue] = useState('');
	const [maxInputValue, setMaxInputValue] = useState('');
	const [isMinInputFocused, setIsMinInputFocused] = useState(false);
	const [isMaxInputFocused, setIsMaxInputFocused] = useState(false);

	const snapPoints = useMemo(() => [FILTER_SHEET_SNAP_POINT], []);
	const selectedTypeIds = useMemo(
		() => new Set(draftState.selectedTypes),
		[draftState.selectedTypes],
	);
	const selectedWeaknessIds = useMemo(
		() => new Set(draftState.selectedWeaknesses),
		[draftState.selectedWeaknesses],
	);
	const selectedHeightIds = useMemo(
		() => new Set(draftState.selectedHeights),
		[draftState.selectedHeights],
	);
	const selectedWeightIds = useMemo(
		() => new Set(draftState.selectedWeights),
		[draftState.selectedWeights],
	);

	const minInputDisplayValue = isMinInputFocused ? minInputValue : `${draftState.numberRange.min}`;
	const maxInputDisplayValue = isMaxInputFocused ? maxInputValue : `${draftState.numberRange.max}`;

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

			const nextRange = getNextRangeFromMinInput({
				draftRange: draftState.numberRange,
				numberRangeDefaults,
				rawValue: value,
			});

			if (!nextRange) return;
			onNumberRangeChange(nextRange);
		},
		[draftState.numberRange, numberRangeDefaults, onNumberRangeChange],
	);

	const handleMaxInputChange = useCallback(
		(value: string) => {
			const sanitizedValue = sanitizeNumericValue(value);
			setMaxInputValue(sanitizedValue);

			const nextRange = getNextRangeFromMaxInput({
				draftRange: draftState.numberRange,
				numberRangeDefaults,
				rawValue: value,
			});

			if (!nextRange) return;
			onNumberRangeChange(nextRange);
		},
		[draftState.numberRange, numberRangeDefaults, onNumberRangeChange],
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

	const isRangeMaxedOut = useMemo(
		() =>
			getIsRangeMaxedOut({
				range: draftState.numberRange,
				defaultRange: numberRangeDefaults,
			}),
		[draftState.numberRange, numberRangeDefaults],
	);

	const scrollRangeInputsIntoView = useCallback(() => {
		if (!isAndroid) return;

		requestAnimationFrame(() => {
			scrollViewRef.current?.scrollToEnd({ animated: true });
		});
	}, []);

	const handleMinInputFocusAndScroll = useCallback(() => {
		handleMinInputFocus();
		scrollRangeInputsIntoView();
	}, [handleMinInputFocus, scrollRangeInputsIntoView]);

	const handleMaxInputFocusAndScroll = useCallback(() => {
		handleMaxInputFocus();
		scrollRangeInputsIntoView();
	}, [handleMaxInputFocus, scrollRangeInputsIntoView]);

	return {
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
	};
};
