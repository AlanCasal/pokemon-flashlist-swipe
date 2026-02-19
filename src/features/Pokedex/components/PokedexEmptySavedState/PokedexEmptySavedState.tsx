import PokeBall from '@components/PokeBall';
import texts from '@utils/texts.json';
import { memo, useMemo } from 'react';
import { Text, View } from 'react-native';

import { getEmptySavedTextParts } from '../../helpers';
import styles from './styles';
import { type PokedexEmptySavedStateProps } from './types';

const PokedexEmptySavedState = ({
	isPokeBallSaved,
	onPokeBallPress,
}: PokedexEmptySavedStateProps) => {
	const emptySavedTextParts = useMemo(
		() => getEmptySavedTextParts(texts.pokedex.emptySavedText),
		[],
	);

	if (!emptySavedTextParts.shouldRenderIcon) {
		return <Text style={styles.text}>{texts.pokedex.emptySavedText}</Text>;
	}

	return (
		<>
			{emptySavedTextParts.topLines.map((line, index) =>
				line ? (
					<Text
						key={`empty-saved-top-${index}`}
						style={styles.text}
					>
						{line}
					</Text>
				) : (
					<View
						key={`empty-saved-top-spacer-${index}`}
						style={styles.spacer}
					/>
				),
			)}
			<View style={styles.inlineRow}>
				<Text style={styles.text}>{emptySavedTextParts.iconPrefix.trimEnd()}</Text>
				<PokeBall
					handleOnPress={onPokeBallPress}
					isSaved={isPokeBallSaved}
					enablePopAnimation
					containerStyles={{ marginHorizontal: 6 }}
				/>
				<Text style={styles.text}>{emptySavedTextParts.iconSuffix.trimStart()}</Text>
			</View>
			{emptySavedTextParts.bottomLines.map((line, index) =>
				line ? (
					<Text
						key={`empty-saved-bottom-${index}`}
						style={[styles.text, styles.textWithTopSpacing]}
					>
						{line}
					</Text>
				) : (
					<View
						key={`empty-saved-bottom-spacer-${index}`}
						style={styles.spacer}
					/>
				),
			)}
		</>
	);
};

export default memo(PokedexEmptySavedState);
