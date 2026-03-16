import BottomSheetGradientHandle from '@components/common/BottomSheetGradientHandle';
import { sharedStyles } from '@constants/sharedStyles';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import type { PokemonBodyProps } from './types';
import { useStyles } from './useStyles';

const {
	opacity: { active: activeOpacity },
} = sharedStyles;

// These percentages mirror the two Figma states where the sheet top sits at ~315px and ~155px.
const SHEET_SNAP_POINTS = ['65%', '83%'];
const TABS_TO_SHEET_GAP = 36;

const PokemonBody = ({
	activeTab,
	animatedSheetIndex,
	animatedSheetPosition,
	children,
	onTabPress,
	tabConfig,
}: PokemonBodyProps) => {
	const styles = useStyles();
	const flattenedTabsRowStyle = StyleSheet.flatten(styles.tabsRow);
	const minTabsTop = typeof flattenedTabsRowStyle?.top === 'number' ? flattenedTabsRowStyle.top : 0;
	const tabsRowStyle = useAnimatedStyle(() => ({
		top: Math.max(animatedSheetPosition.value - TABS_TO_SHEET_GAP, minTabsTop),
	}));

	return (
		<>
			<BottomSheet
				index={0}
				snapPoints={SHEET_SNAP_POINTS}
				animatedIndex={animatedSheetIndex}
				animatedPosition={animatedSheetPosition}
				enablePanDownToClose={false}
				enableDynamicSizing={false}
				overDragResistanceFactor={8}
				containerStyle={styles.sheetContainer}
				handleComponent={BottomSheetGradientHandle}
				backgroundStyle={styles.sheetBackground}
			>
				<BottomSheetScrollView
					contentContainerStyle={styles.sheetContentContainer}
					showsVerticalScrollIndicator={false}
				>
					{children}
				</BottomSheetScrollView>
			</BottomSheet>

			<Animated.View
				pointerEvents='box-none'
				style={styles.movingTopLayer}
			>
				<Animated.View style={[styles.tabsRow, tabsRowStyle]}>
					{tabConfig.map(tab => {
						const isFocused = activeTab === tab.id;

						return (
							<TouchableOpacity
								key={tab.id}
								style={styles.tabPressable}
								activeOpacity={activeOpacity}
								onPress={() => onTabPress(tab.id)}
							>
								<Text
									style={[
										styles.tabLabel,
										isFocused ? styles.tabLabelFocused : styles.tabLabelIdle,
									]}
								>
									{tab.label}
								</Text>
							</TouchableOpacity>
						);
					})}
				</Animated.View>
			</Animated.View>
		</>
	);
};

export default PokemonBody;
