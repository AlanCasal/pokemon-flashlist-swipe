import PokeballBottomHalf from '@assets/images/pokeball-bott-half.svg';
import Pokeball from '@assets/images/pokeball-full.svg';
import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useStyles } from './styles';
import type { PokemonBodyProps } from './types';

const {
	opacity: { active: activeOpacity },
} = sharedStyles;

// These percentages mirror the two Figma states where the sheet top sits at ~315px and ~155px.
const SHEET_SNAP_POINTS = ['65%', '83%'];

const PokemonBody = ({
	activeTab,
	animatedSheetIndex,
	children,
	movingTopLayerStyle,
	onTabPress,
	tabConfig,
}: PokemonBodyProps) => {
	const styles = useStyles();

	return (
		<>
			<Animated.View style={[styles.movingTopLayer, movingTopLayerStyle]}>
				<View style={styles.topPokeballDecoration}>
					<Pokeball
						width={100}
						height={100}
						fill={textColor.light}
						fillOpacity={0.18}
						stroke={textColor.light}
						strokeOpacity={0.18}
					/>
				</View>

				<View style={styles.tabsRow}>
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

					{activeTab === 'evolution' && (
						<View
							style={styles.activeTabDecoration}
							pointerEvents='none'
						>
							<PokeballBottomHalf
								width={120}
								height={60}
							/>
						</View>
					)}
				</View>
			</Animated.View>

			<BottomSheet
				index={0}
				snapPoints={SHEET_SNAP_POINTS}
				animatedIndex={animatedSheetIndex}
				enablePanDownToClose={false}
				enableDynamicSizing={false}
				overDragResistanceFactor={8}
				handleIndicatorStyle={styles.handleIndicator}
				backgroundStyle={styles.sheetBackground}
			>
				<BottomSheetScrollView
					contentContainerStyle={styles.sheetContentContainer}
					showsVerticalScrollIndicator={false}
				>
					{children}
				</BottomSheetScrollView>
			</BottomSheet>
		</>
	);
};

export default PokemonBody;
