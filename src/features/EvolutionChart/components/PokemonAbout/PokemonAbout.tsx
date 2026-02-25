import PokemonTypeIcon from '@components/PokemonTypeIcon';
import { textColor, typeColors } from '@constants/colors';
import texts from '@utils/texts.json';
import { Fragment } from 'react';
import { Text, View } from 'react-native';

import { useStyles } from './styles';
import type {
	PokemonAboutProps,
	PokemonAboutRowProps,
	PokemonAboutWeaknessBadgeProps,
} from './types';

const FALLBACK_VALUE = '--';
const FEMALE_SYMBOL = '♀';
const MALE_SYMBOL = '♂';
const GENDER_SEPARATOR = ', ';

const PokemonAboutWeaknessBadge = ({ label, type }: PokemonAboutWeaknessBadgeProps) => {
	const styles = useStyles();

	return (
		<View style={[styles.weaknessBadge, { backgroundColor: typeColors[type] }]}>
			<PokemonTypeIcon
				type={type}
				size={15}
				fill={textColor.light}
			/>
			<Text style={styles.weaknessBadgeLabel}>{label}</Text>
		</View>
	);
};

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
								<PokemonAboutWeaknessBadge
									key={`${badge.type}-${badge.label}`}
									type={badge.type}
									label={badge.label}
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
					<Fragment>
						<Text style={styles.rowValue}>{row.value ?? FALLBACK_VALUE}</Text>
						{row.secondaryValue ? (
							<Text style={styles.rowSecondaryValue}>{row.secondaryValue}</Text>
						) : null}
					</Fragment>
				)}
			</View>
		</View>
	);
};

const PokemonAbout = ({ data, error, isLoading, primaryType }: PokemonAboutProps) => {
	const styles = useStyles();

	if (isLoading) {
		return (
			<View style={styles.root}>
				<Text style={styles.fallbackText}>{texts.evolution.aboutLoadingMessage}</Text>
			</View>
		);
	}

	if (error || !data) {
		return (
			<View style={styles.root}>
				<Text style={styles.fallbackText}>{texts.evolution.aboutLoadErrorMessage}</Text>
			</View>
		);
	}

	return (
		<View style={styles.root}>
			<Text style={styles.description}>{data.description}</Text>
			<View style={styles.sectionList}>
				{data.sections.map(section => (
					<View
						key={section.title}
						style={styles.section}
					>
						<Text style={[styles.sectionTitle, { color: typeColors[primaryType] }]}>
							{section.title}
						</Text>
						<View style={styles.sectionRows}>
							{section.rows.map((row, rowIndex) => (
								<PokemonAboutRow
									key={`${section.title}-${row.label}-${rowIndex}`}
									label={row.label}
									row={row}
								/>
							))}
						</View>
					</View>
				))}
			</View>
		</View>
	);
};

export default PokemonAbout;
