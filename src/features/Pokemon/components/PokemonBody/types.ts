import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';

import type { EvolutionTab, PokemonTabConfig } from '../../types';

export interface PokemonBodyProps {
	activeTab: EvolutionTab;
	animatedSheetIndex: SharedValue<number>;
	animatedSheetPosition: SharedValue<number>;
	children: ReactNode;
	onTabPress: (tab: EvolutionTab) => void;
	tabConfig: PokemonTabConfig[];
}
