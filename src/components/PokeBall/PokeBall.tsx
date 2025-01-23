import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import React, { lazy, Suspense } from 'react';
import { POKEBALL_COLORS } from '@/src/constants/sharedStyles';

const Pokeball = lazy(() => import('@/assets/images/pokeball-full.svg'));
const POKEBALL_SIZE = 17;

interface PokeBallProps {
	handleOnPress?: () => void;
	isSaved?: boolean;
	size?: number;
	containerStyles?: StyleProp<ViewStyle>;
	isDisabled?: boolean;
}

const PokeBall = ({
	handleOnPress,
	isSaved,
	containerStyles = {},
	size = POKEBALL_SIZE,
	isDisabled = false,
}: PokeBallProps) => {
	const pokeballColors = {
		fillColor: POKEBALL_COLORS.white,
		fillOpacity: 0.7,
	};

	if (isSaved) {
		pokeballColors.fillColor = POKEBALL_COLORS.red;
		pokeballColors.fillOpacity = 1;
	}

	return (
		<TouchableOpacity
			style={containerStyles}
			onPress={handleOnPress}
			disabled={isDisabled}
		>
			<Suspense fallback={null}>
				<Pokeball fill={pokeballColors.fillColor} width={size} height={size} />
			</Suspense>
		</TouchableOpacity>
	);
};

export default PokeBall;
