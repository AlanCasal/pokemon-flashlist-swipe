import { backgroundColors, textColor } from '@constants/colors';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BASE_STAT_TRACK_WIDTH = 159;
const CONTENT_HORIZONTAL_PADDING = 40;
const SECTION_SPACING = 40;
const TOP_PADDING = 40;
const BOTTOM_PADDING = 32;

export const useStyles = () => {
	const { bottom } = useSafeAreaInsets();

	return StyleSheet.create({
		baseStatColumn: {
			rowGap: 15,
		},
		baseStatRow: {
			alignItems: 'center',
			columnGap: 10,
			flexDirection: 'row',
			width: '100%',
		},
		baseStatTrack: {
			backgroundColor: backgroundColors.statTrack,
			borderRadius: 2,
			flexGrow: 1,
			flexShrink: 1,
			height: 4,
			maxWidth: BASE_STAT_TRACK_WIDTH,
			minWidth: 0,
			overflow: 'hidden',
		},
		baseStatTrackFill: {
			borderRadius: 2,
			height: 4,
		},
		baseStatValue: {
			color: textColor.grey,
			fontSize: 16,
			fontWeight: '400',
			lineHeight: 20,
			textAlign: 'right',
			width: 31,
		},
		baseStatValueRange: {
			color: textColor.grey,
			fontSize: 16,
			fontWeight: '400',
			lineHeight: 20,
			textAlign: 'right',
			width: 30,
		},
		defenseBadge: {
			alignItems: 'center',
			borderRadius: 3,
			height: 30,
			justifyContent: 'center',
			padding: 10,
			width: 30,
		},
		defenseDescription: {
			color: textColor.grey,
			fontSize: 16,
			fontWeight: '400',
			lineHeight: 22,
		},
		defenseGrid: {
			rowGap: 16,
			width: '100%',
		},
		defenseItem: {
			alignItems: 'center',
			rowGap: 10,
			width: 30,
		},
		defenseMultiplier: {
			color: textColor.grey,
			fontSize: 16,
			fontWeight: '400',
			lineHeight: 20,
		},
		defenseMultiplierHidden: {
			color: 'transparent',
		},
		defenseRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			width: '100%',
		},
		feedbackText: {
			color: textColor.grey,
			fontSize: 16,
			fontWeight: '500',
			lineHeight: 22,
			textAlign: 'center',
		},
		noteText: {
			color: textColor.grey,
			fontSize: 12,
			fontWeight: '500',
			lineHeight: 16,
		},
		root: {
			paddingBottom: bottom + BOTTOM_PADDING,
			paddingHorizontal: CONTENT_HORIZONTAL_PADDING,
			paddingTop: TOP_PADDING,
		},
		rowLabel: {
			color: textColor.dark,
			flexShrink: 0,
			fontSize: 12,
			fontWeight: '500',
			lineHeight: 16,
			minWidth: 44,
		},
		section: {
			rowGap: 20,
			width: '100%',
		},
		sectionList: {
			rowGap: SECTION_SPACING,
			width: '100%',
		},
		sectionTitleText: {
			fontSize: 16,
			fontWeight: '700',
			lineHeight: 20,
		},
		totalLabel: {
			color: textColor.dark,
			fontSize: 12,
			fontWeight: '500',
			lineHeight: 16,
			textAlign: 'right',
			width: 30,
		},
		totalStatTrack: {
			backgroundColor: 'transparent',
		},
		totalValue: {
			color: textColor.grey,
			fontSize: 16,
			fontWeight: '700',
			lineHeight: 20,
			textAlign: 'right',
			width: 31,
		},
	});
};
