import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';

export interface DetailSheetTabConfig<T extends string = string> {
	id: T;
	label: string;
}

export interface DetailSheetProps<T extends string = string> {
	activeTab: T;
	animatedSheetIndex: SharedValue<number>;
	animatedSheetPosition: SharedValue<number>;
	children: ReactNode;
	onTabPress: (tab: T) => void;
	tabConfig: DetailSheetTabConfig<T>[];
}
