import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { icons } from 'lucide-react-native';
import styles from './styles';
import Animated, {
	FadeInRight,
	LayoutAnimationConfig,
	LinearTransition,
} from 'react-native-reanimated';
import { MotiProps, MotiView } from 'moti';
import { motifySvg } from 'moti/svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IconNames = keyof typeof icons;

export type TabItem = {
	icon: IconNames;
	label?: string;
	itemActiveColor?: string;
	itemInactiveColor?: string;
	itemActiveBackgroundColor?: string;
	itemInactiveBackgroundColor?: string;
	isRounded?: boolean;
	action?: () => void;
};

type TabsProps = {
	data: TabItem[];
	selectedIndex: number;
	onChange: (index: number) => void;
	activeColor?: string;
	inactiveColor?: string;
	activeBackgroundColor?: string;
	inactiveBackgroundColor?: string;
};

type IconProps = {
	name: IconNames;
} & MotiProps;

const Icon = ({ name, ...rest }: IconProps) => {
	const IconComponent = motifySvg(icons[name])(); // enables animations to icons

	return <IconComponent size={16} {...rest} />;
};

const Tabs = ({
	data,
	selectedIndex,
	onChange,
	activeColor = '#FFF',
	inactiveColor = '#999',
	activeBackgroundColor = '#111',
	inactiveBackgroundColor = '#DDD',
}: TabsProps) => {
	const { bottom } = useSafeAreaInsets();

	const handleOnPress = (index: number) => {
		onChange(index);
		data[index].action?.();
	};

	return (
		<View style={[styles.container, { paddingBottom: bottom + 10 }]}>
			{data.map((item, index) => {
				const isSelected = index === selectedIndex;

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
							<Icon
								animate={{
									color: isSelected
										? item.itemActiveColor || activeColor
										: item.itemInactiveColor || inactiveColor,
									...(isSelected && {
										fill: isSelected
											? item.itemActiveColor || activeColor
											: item.itemInactiveColor || inactiveColor,
									}),
								}}
								name={item.icon}
							/>

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
