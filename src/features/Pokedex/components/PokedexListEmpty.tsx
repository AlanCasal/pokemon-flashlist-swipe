import Spinner from '@assets/animated/spinner.svg';
import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import texts from '@utils/texts.json';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { type PokedexListEmptyProps } from '../types';
import PokedexEmptySavedState from './PokedexEmptySavedState';

const PokedexListEmpty = ({
	shouldShowSearchNotFound,
	isSearchActive,
	isSavedMode,
	isSearchingPokemon,
	spinnerAnimatedStyle,
	isEmptySavedPokeBallSaved,
	onEmptySavedPokeBallPress,
}: PokedexListEmptyProps) => {
	if (shouldShowSearchNotFound) {
		return (
			<View
				className='mt-16 items-center justify-center'
				style={{ paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding }}
			>
				<Text
					className='text-center text-base'
					style={{
						fontFamily: sharedStyles.typography.primaryFont,
						color: textColor.grey,
					}}
				>
					{texts.pokedex.searchNotFoundText}
				</Text>
			</View>
		);
	}

	if (isSearchActive && !isSavedMode && isSearchingPokemon) {
		return (
			<View className='items-center justify-center'>
				<Animated.View style={spinnerAnimatedStyle}>
					<Spinner
						width={sharedStyles.pokedex.searchLoadingSpinner.size}
						height={sharedStyles.pokedex.searchLoadingSpinner.size}
					/>
				</Animated.View>
			</View>
		);
	}

	if (!isSavedMode) return null;

	return (
		<View
			className='mt-16 items-center justify-center'
			style={{ paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding }}
		>
			<PokedexEmptySavedState
				isPokeBallSaved={isEmptySavedPokeBallSaved}
				onPokeBallPress={onEmptySavedPokeBallPress}
			/>
		</View>
	);
};

export default PokedexListEmpty;
