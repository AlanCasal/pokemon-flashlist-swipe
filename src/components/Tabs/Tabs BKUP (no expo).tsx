import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import styles from './styles';
import Animated, {
	FadeInRight,
	LayoutAnimationConfig,
	LinearTransition,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export type TabItem = {
	icon: keyof typeof MaterialCommunityIcons.glyphMap;
	label?: string;
	itemActiveColor?: string;
	itemInactiveColor?: string;
	itemActiveBackgroundColor?: string;
	itemInactiveBackgroundColor?: string;
	isRounded?: boolean;
	isSameInactiveIcon?: boolean;
	action?: () => void;
};

type TabsProps = {
	data?: TabItem[];
	defaultActiveIndex?: number;
	activeColor?: string;
	inactiveColor?: string;
	activeBackgroundColor?: string;
	inactiveBackgroundColor?: string;
};

const INITIAL_TABS: TabItem[] = [
	{
		icon: 'credit-card-chip',
		label: 'Pokedex',
		action: () => router.push('/'),
	},
	{ icon: 'star', label: 'Saved', action: () => router.push('/saved') },
];

const Tabs = ({
	data = INITIAL_TABS,
	activeColor = '#FFF',
	inactiveColor = '#999',
	activeBackgroundColor = '#111',
	inactiveBackgroundColor = '#DDD',
	defaultActiveIndex = 0,
	...props
}: TabsProps) => {
	const { bottom } = useSafeAreaInsets();
	const [selectedIndex, setSelectedIndex] =
		useState<number>(defaultActiveIndex);

	const handleOnPress = (index: number) => {
		setSelectedIndex(index);
		data[index].action?.();
	};

	return (
		<View style={[styles.container, { paddingBottom: bottom + 10 }]}>
			{data.map((item, index) => {
				const isSelected = index === selectedIndex;
				const icon =
					isSelected || item.isSameInactiveIcon
						? item.icon
						: (`${item.icon}-outline` as keyof typeof MaterialCommunityIcons.glyphMap);

				return (
					<MotiView
						key={index}
						layout={LinearTransition.springify().damping(80).stiffness(200)}
					>
						<MotiView
							style={StyleSheet.absoluteFillObject}
							animate={{
								...styles.animatedContainer,
								borderRadius: item.isRounded ? 100 : 8,
								backgroundColor: isSelected
									? item.itemActiveBackgroundColor || activeBackgroundColor
									: item.itemInactiveBackgroundColor || inactiveBackgroundColor,
							}}
						/>
						<Pressable
							onPress={() => handleOnPress(index)}
							style={styles.buttonContainer}
						>
							<MaterialCommunityIcons name={icon} color={'white'} size={18} />

							{isSelected && item.label && (
								<LayoutAnimationConfig skipEntering>
									<Animated.Text
										entering={FadeInRight.springify()
											.damping(80)
											.stiffness(200)}
										style={{
											color: isSelected
												? item.itemActiveColor || activeColor
												: item.itemInactiveColor || inactiveColor,
											fontWeight: isSelected ? 'bold' : 'normal',
										}}
									>
										{item.label}
									</Animated.Text>
								</LayoutAnimationConfig>
							)}
						</Pressable>
					</MotiView>
				);
			})}
		</View>
	);
};

export default Tabs;
