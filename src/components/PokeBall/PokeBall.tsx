import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import React, { lazy, Suspense } from 'react';

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
		fillColor: 'white',
		strokeColor: 'white',
		strokeWidth: 0,
		strokeOpacity: 0,
		fillOpacity: 0.7,
	};

	if (isSaved) {
		pokeballColors.fillColor = 'red';
		pokeballColors.strokeColor = 'black';
		pokeballColors.strokeWidth = 2;
		pokeballColors.strokeOpacity = 1;
		pokeballColors.fillOpacity = 1;
	}

	return (
		<TouchableOpacity
			style={containerStyles}
			onPress={handleOnPress}
			disabled={isDisabled}
		>
			<Suspense fallback={null}>
				<Pokeball
					fill={pokeballColors.fillColor}
					stroke={pokeballColors.strokeColor}
					strokeWidth={pokeballColors.strokeWidth}
					width={size}
					height={size}
					strokeOpacity={pokeballColors.strokeOpacity}
					fillOpacity={pokeballColors.fillOpacity}
				/>
			</Suspense>
		</TouchableOpacity>
	);
};

export default PokeBall;
