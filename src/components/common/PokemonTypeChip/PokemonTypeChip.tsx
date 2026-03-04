import PokemonTypeIcon from '@components/PokemonTypeIcon';
import { typeColors } from '@constants/colors';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import styles from './styles';
import type { PokemonTypeChipProps } from './types';

const PokemonTypeChip = ({
	type,
	containerStyle,
	iconFill,
	iconSize,
	labelStyle,
}: PokemonTypeChipProps) => {
	const { t } = useTranslation();

	return (
		<View style={[styles.container, { backgroundColor: typeColors[type] }, containerStyle]}>
			<PokemonTypeIcon
				type={type}
				fill={iconFill}
				size={iconSize}
			/>
			<Text style={[styles.label, labelStyle]}>{t(`pokemonType.${type}`)}</Text>
		</View>
	);
};

export default PokemonTypeChip;
