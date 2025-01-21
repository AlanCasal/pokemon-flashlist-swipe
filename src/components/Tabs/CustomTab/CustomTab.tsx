/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';
import Animated, {
	FadeInRight,
	LinearTransition,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { typeColors } from '@/src/constants/colors';

interface CustomTabProps {
	isFocused: boolean;
	label?: string;
	tabBarIcon: (props: {
		color: string;
		size: number;
		focused: boolean;
	}) => React.ReactNode;
	onPress: () => void;
	isRounded?: boolean;
	activeBackgroundColor?: string;
	inactiveBackgroundColor?: string;
	activeColor?: string;
	inactiveColor?: string;
}

const CustomTab = ({
	isFocused,
	label,
	tabBarIcon,
	onPress,
	isRounded,
	activeBackgroundColor = typeColors.dragon,
	inactiveBackgroundColor = typeColors.dark,
	activeColor = '#FFF',
	inactiveColor = '#999',
}: CustomTabProps) => {
	return (
		<MotiView layout={LinearTransition.springify().damping(80).stiffness(200)}>
			<MotiView
				style={StyleSheet.absoluteFillObject}
				animate={{
					...styles.animatedContainer,
					backgroundColor: isFocused
						? activeBackgroundColor
						: inactiveBackgroundColor,
					...(isRounded ? { borderRadius: 100 } : {}),
				}}
			/>

			<TouchableOpacity
				activeOpacity={0.6}
				onPress={onPress}
				style={[styles.buttonContainer]}
			>
				{tabBarIcon({
					color: isFocused ? activeColor : inactiveColor,
					size: 18,
					focused: isFocused,
				})}

				{isFocused && label && (
					<Animated.Text
						entering={FadeInRight.springify().damping(80).stiffness(200)}
						style={{
							color: isFocused ? activeColor : inactiveColor,
							fontWeight: isFocused ? 'bold' : 'normal',
						}}
					>
						{label}
					</Animated.Text>
				)}
			</TouchableOpacity>
		</MotiView>
	);
};

export default CustomTab;
