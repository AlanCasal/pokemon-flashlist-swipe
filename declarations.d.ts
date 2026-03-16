import type { TabBarVisibility } from '@/src/types';

declare module '*.svg' {
	import { SvgProps } from 'react-native-svg';
	const content: React.FC<SvgProps>;
	export default content;
}

declare module '*.gif' {
	const content: number;
	export default content;
}

declare module '@react-navigation/bottom-tabs' {
	export interface BottomTabNavigationOptions {
		tabBarVisibility?: TabBarVisibility;
	}
}
