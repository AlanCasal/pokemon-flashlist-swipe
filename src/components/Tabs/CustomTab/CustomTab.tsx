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

const activeBackgroundColor = typeColors.dragon;
const inactiveBackgroundColor = typeColors.dark;
const activeColor = '#FFF';
const inactiveColor = '#999';

interface CustomTabProps {
	isFocused: boolean;
	label: string;
	tabBarIcon: (props: {
		color: string;
		size: number;
		focused: boolean;
	}) => React.ReactNode;
	onPress: () => void;
}

const CustomTab = ({
	isFocused,
	label,
	tabBarIcon,
	onPress,
}: CustomTabProps) => {
	return (
		<MotiView layout={LinearTransition.springify().damping(80).stiffness(200)}>
			<MotiView
				style={StyleSheet.absoluteFillObject}
				animate={{
					...styles.animatedContainer,
					borderRadius: 8,
					backgroundColor: isFocused
						? activeBackgroundColor
						: inactiveBackgroundColor,
				}}
			/>

			<TouchableOpacity
				activeOpacity={0.6}
				onPress={onPress}
				style={styles.buttonContainer}
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
