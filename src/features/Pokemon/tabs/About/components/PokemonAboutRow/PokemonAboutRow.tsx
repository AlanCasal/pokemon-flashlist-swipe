import PokemonTypeChip from '@components/common/PokemonTypeChip';
import { textColor } from '@constants/colors';
import { Text, View } from 'react-native';

import { useStyles } from '../../styles';
import type { PokemonAboutRowProps } from '../../types';

const FALLBACK_VALUE = '--';
const FEMALE_SYMBOL = '♀';
const MALE_SYMBOL = '♂';
const GENDER_SEPARATOR = ', ';

const PokemonAboutRow = ({ label, row }: PokemonAboutRowProps) => {
	const styles = useStyles();
	const femaleValueText = ` ${row.femaleValue ?? FALLBACK_VALUE}`;
	const maleValueText = ` ${row.maleValue ?? FALLBACK_VALUE}`;
	const secondaryInlineText = ` ${row.secondaryValue}`;

	return (
		<View style={styles.row}>
			<Text style={styles.rowLabel}>{label}</Text>
			<View style={styles.rowValueColumn}>
				{row.kind === 'weaknessBadges' ? (
					row.weaknesses?.length ? (
						<View style={styles.weaknessBadges}>
							{row.weaknesses.map(badge => (
								<PokemonTypeChip
									key={`${badge.type}-${badge.label}`}
									type={badge.type}
									containerStyle={styles.weaknessChip}
									iconSize={15}
									iconFill={textColor.light}
									labelStyle={styles.weaknessChipLabel}
								/>
							))}
						</View>
					) : (
						<Text style={styles.rowValue}>{FALLBACK_VALUE}</Text>
					)
				) : row.kind === 'genderSplit' ? (
					<Text style={styles.rowValue}>
						<Text style={[styles.genderFemale, styles.genderSymbol]}>{FEMALE_SYMBOL}</Text>
						<Text style={styles.genderFemale}>{femaleValueText}</Text>
						<Text>{GENDER_SEPARATOR}</Text>
						<Text style={[styles.genderMale, styles.genderSymbol]}>{MALE_SYMBOL}</Text>
						<Text style={styles.genderMale}>{maleValueText}</Text>
					</Text>
				) : row.secondaryValue && row.secondaryMode === 'inline' ? (
					<Text style={styles.rowValue}>
						{row.value ?? FALLBACK_VALUE}
						<Text style={styles.rowSecondaryValue}>{secondaryInlineText}</Text>
					</Text>
				) : (
					<>
						<Text style={styles.rowValue}>{row.value ?? FALLBACK_VALUE}</Text>
						{row.secondaryValue ? (
							<Text style={styles.rowSecondaryValue}>{row.secondaryValue}</Text>
						) : null}
					</>
				)}
			</View>
		</View>
	);
};

export default PokemonAboutRow;
