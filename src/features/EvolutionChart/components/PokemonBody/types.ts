import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated';

import type { EvolutionChartTabConfig, EvolutionTab } from '../../types';

export interface PokemonBodyProps {
	activeTab: EvolutionTab;
	animatedSheetIndex: SharedValue<number>;
	children: ReactNode;
	movingTopLayerStyle: AnimatedStyle<ViewStyle>;
	onTabPress: (tab: EvolutionTab) => void;
	tabConfig: EvolutionChartTabConfig[];
}
