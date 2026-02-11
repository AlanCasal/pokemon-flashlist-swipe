/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import sharedStyles from '@constants/sharedStyles';
import Animated, {
	FadeInRight,
	LinearTransition,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { typeColors } from '@constants/colors';

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
				className='absolute inset-0 overflow-hidden rounded-lg'
				style={sharedStyles.shadow}
				animate={{
					backgroundColor: isFocused
						? activeBackgroundColor
						: inactiveBackgroundColor,
					...(isRounded ? { borderRadius: 100 } : {}),
				}}
			/>

			<TouchableOpacity
				activeOpacity={0.6}
				onPress={onPress}
				className='flex-row items-center justify-center gap-1 p-3'
			>
				{tabBarIcon({
					color: isFocused ? activeColor : inactiveColor,
					size: 18,
					focused: isFocused,
				})}

				{isFocused && label && (
					<Animated.Text
						entering={FadeInRight.springify().damping(80).stiffness(200)}
						className='text-base'
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
