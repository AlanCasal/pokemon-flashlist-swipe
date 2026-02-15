import { ReactNode } from 'react';

export type TabBarIconRenderer = (props: {
	color: string;
	size: number;
	focused: boolean;
}) => ReactNode;

export interface CustomTabProps {
	isFocused: boolean;
	label?: string;
	tabBarIcon: TabBarIconRenderer;
	onPress: () => void;
	isRounded?: boolean;
	activeBackgroundColor?: string;
	inactiveBackgroundColor?: string;
	activeColor?: string;
	inactiveColor?: string;
}
