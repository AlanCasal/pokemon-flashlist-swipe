import Spinner from '@assets/animated/spinner.svg';
import texts from '@utils/texts.json';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { type PokedexListEmptyProps } from '../../types';
import PokedexEmptySavedState from '../PokedexEmptySavedState';
import styles from './styles';

const SEARCH_LOADING_SPINNER_SIZE = 72;

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
						width={SEARCH_LOADING_SPINNER_SIZE}
						height={SEARCH_LOADING_SPINNER_SIZE}
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
