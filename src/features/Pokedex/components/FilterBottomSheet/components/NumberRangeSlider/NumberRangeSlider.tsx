import React, { memo, useCallback, useMemo, useState } from 'react';
import { type LayoutChangeEvent, Text, View } from 'react-native';

import type { NumberRangeSliderProps } from './types';
import { useStyles } from './useStyles';

const RANGE_THUMB_SIZE = 20;
const RANGE_LABEL_OFFSET = 10;
const RANGE_LABEL_BOUNDARY_PADDING = 24;

const clampNumber = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

const NumberRangeSlider = ({ range, min, max, isRangeMaxedOut }: NumberRangeSliderProps) => {
	const styles = useStyles({ isRangeMaxedOut });
	const [trackWidth, setTrackWidth] = useState(0);

	const { maxLabelLeft, maxOffset, minLabelLeft, minOffset } = useMemo(() => {
		const rangeSpread = Math.max(max - min, 1);
		const nextMinOffset = ((range.min - min) / rangeSpread) * trackWidth;
		const nextMaxOffset = ((range.max - min) / rangeSpread) * trackWidth;
		const maxLabelBoundary = Math.max(trackWidth - RANGE_LABEL_BOUNDARY_PADDING, 0);

		return {
			maxOffset: nextMaxOffset,
			minOffset: nextMinOffset,
			minLabelLeft: clampNumber(nextMinOffset - RANGE_LABEL_OFFSET, 0, maxLabelBoundary),
			maxLabelLeft: clampNumber(nextMaxOffset - RANGE_LABEL_OFFSET, 0, maxLabelBoundary),
		};
	}, [max, min, range.max, range.min, trackWidth]);

	const minOverlapOffset = useMemo(() => {
		const isOverlapping = range.max - range.min <= 150;
		const isMaxNearEdge = range.max >= 1000;
		const isMinNearEdge = range.min <= 100;
		if (!isOverlapping || isMinNearEdge) return 0;
		if (isMaxNearEdge) return 40;
		return 20;
	}, [range.max, range.min]);

	const maxOverlapOffset = useMemo(() => {
		const isOverlapping = range.max - range.min <= 150;
		const isMaxNearEdge = range.max >= 1000;
		const isMinNearEdge = range.min <= 100;
		if (!isOverlapping || isMaxNearEdge) return 0;
		if (isMinNearEdge) return 40;
		return 20;
	}, [range.max, range.min]);

	const handleTrackLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
		const nextTrackWidth = nativeEvent.layout.width;
		setTrackWidth(currentTrackWidth =>
			currentTrackWidth === nextTrackWidth ? currentTrackWidth : nextTrackWidth,
		);
	}, []);

	const minLabel = `#${range.min}`;
	const maxLabel = `#${range.max}`;

	return (
		<View style={styles.trackInsetContainer}>
			<View
				onLayout={handleTrackLayout}
				style={styles.rangeTrackContainer}
			>
				<View style={styles.rangeTrackBackground} />

				{trackWidth > 0 && (
					<>
						<View
							style={[
								styles.rangeTrackActive,
								{
									left: minOffset,
									width: Math.max(maxOffset - minOffset, 0),
								},
							]}
						/>
						<View style={[styles.rangeThumb, { left: minOffset - RANGE_THUMB_SIZE / 2 }]} />
						<View style={[styles.rangeThumb, { left: maxOffset - RANGE_THUMB_SIZE / 2 }]} />
					</>
				)}
			</View>

			<View style={styles.rangeValuesRow}>
				<Text style={[styles.rangeValue, { left: minLabelLeft - minOverlapOffset }]}>
					{minLabel}
				</Text>
				<Text style={[styles.rangeValue, { left: maxLabelLeft + maxOverlapOffset }]}>
					{maxLabel}
				</Text>
			</View>
		</View>
	);
};

const arePropsEqual = (prevProps: NumberRangeSliderProps, nextProps: NumberRangeSliderProps) =>
	prevProps.min === nextProps.min &&
	prevProps.max === nextProps.max &&
	prevProps.isRangeMaxedOut === nextProps.isRangeMaxedOut &&
	prevProps.range.min === nextProps.range.min &&
	prevProps.range.max === nextProps.range.max;

export default memo(NumberRangeSlider, arePropsEqual);
