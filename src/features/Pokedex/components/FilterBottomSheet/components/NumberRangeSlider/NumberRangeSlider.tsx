import React, { useState } from 'react';
import { Text, View } from 'react-native';

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

	const rangeSpread = Math.max(max - min, 1);
	const minOffset = ((range.min - min) / rangeSpread) * trackWidth;
	const maxOffset = ((range.max - min) / rangeSpread) * trackWidth;

	const minLabelLeft = clampNumber(
		minOffset - RANGE_LABEL_OFFSET,
		0,
		Math.max(trackWidth - RANGE_LABEL_BOUNDARY_PADDING, 0),
	);

	const maxLabelLeft = clampNumber(
		maxOffset - RANGE_LABEL_OFFSET,
		0,
		Math.max(trackWidth - RANGE_LABEL_BOUNDARY_PADDING, 0),
	);

	const isOverlapping = range.max - range.min <= 150;
	const isMaxNearEdge = range.max >= 1000;
	const isMinNearEdge = range.min <= 100;

	const minOverlapOffset = () => {
		if (!isOverlapping || isMinNearEdge) return 0;
		if (isMaxNearEdge) return 40;
		return 20;
	};

	const maxOverlapOffset = () => {
		if (!isOverlapping || isMaxNearEdge) return 0;
		if (isMinNearEdge) return 40;
		return 20;
	};

	const minLabel = `#${range.min}`;
	const maxLabel = `#${range.max}`;

	return (
		<View style={styles.trackInsetContainer}>
			<View
				onLayout={({ nativeEvent }) => {
					setTrackWidth(nativeEvent.layout.width);
				}}
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
				<Text style={[styles.rangeValue, { left: minLabelLeft - minOverlapOffset() }]}>
					{minLabel}
				</Text>
				<Text style={[styles.rangeValue, { left: maxLabelLeft + maxOverlapOffset() }]}>
					{maxLabel}
				</Text>
			</View>
		</View>
	);
};

export default NumberRangeSlider;
