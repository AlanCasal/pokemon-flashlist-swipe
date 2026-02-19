import Spinner from '@assets/animated/spinner.svg';
import { sharedStyles } from '@constants/sharedStyles';
import texts from '@utils/texts.json';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { type PokedexListEmptyProps } from '../../types';
import PokedexEmptySavedState from '../PokedexEmptySavedState';
import styles from './styles';

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
				style={[styles.content, styles.contentWithMarginTop, styles.contentWithPaddingHorizontal]}
			>
				<Text style={styles.message}>{texts.pokedex.searchNotFoundText}</Text>
			</View>
		);
	}

	if (isSearchActive && !isSavedMode && isSearchingPokemon) {
		return (
			<View style={styles.content}>
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
			style={[styles.content, styles.contentWithMarginTop, styles.contentWithPaddingHorizontal]}
		>
			<PokedexEmptySavedState
				isPokeBallSaved={isEmptySavedPokeBallSaved}
				onPokeBallPress={onEmptySavedPokeBallPress}
			/>
		</View>
	);
};

export default PokedexListEmpty;
