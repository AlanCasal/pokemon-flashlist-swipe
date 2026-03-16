import CharmanderLoading from '@components/common/CharmanderLoading';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { type PokedexListEmptyProps } from '../../types';
import PokedexEmptySavedState from '../PokedexEmptySavedState';
import { useStyles } from './useStyles';

const PokedexListEmpty = ({
	shouldShowSearchNotFound,
	shouldShowFilteredEmptyState,
	isSavedMode,
	shouldShowLoadingFeedback,
	isEmptySavedPokeBallSaved,
	onEmptySavedPokeBallPress,
}: PokedexListEmptyProps) => {
	const styles = useStyles();
	const { t } = useTranslation();

	if (shouldShowSearchNotFound) {
		return (
			<View
				style={[styles.content, styles.contentWithMarginTop, styles.contentWithPaddingHorizontal]}
			>
				<Text style={styles.message}>{t('pokedex.searchNotFoundText')}</Text>
			</View>
		);
	}

	if (shouldShowFilteredEmptyState) {
		return (
			<View
				style={[styles.content, styles.contentWithMarginTop, styles.contentWithPaddingHorizontal]}
			>
				<Text style={styles.message}>{t('pokedex.emptyFilteredText')}</Text>
			</View>
		);
	}

	if (shouldShowLoadingFeedback && !isSavedMode) {
		return <CharmanderLoading />;
	}

	if (shouldShowLoadingFeedback) return null;
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
