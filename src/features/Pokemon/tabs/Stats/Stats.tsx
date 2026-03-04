import PokemonTypeIcon from '@components/PokemonTypeIcon';
import { textColor, typeColors } from '@constants/colors';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { useStyles } from './styles';
import type { PokemonStatsProps } from './types';

const TYPE_DEFENSES_ROW_SIZE = 9;
const BAR_MIN_VISIBLE_WIDTH = 2;
const NEUTRAL_MULTIPLIER_PLACEHOLDER = '1';

const formatStatValue = (value: number | null) => (value === null ? '--' : value.toString());

const Stats = ({ data, displayName, error, isLoading, primaryType }: PokemonStatsProps) => {
	const { t } = useTranslation();
	const styles = useStyles();
	const sectionTitleColor = typeColors[primaryType];

	if (isLoading && !data) {
		return (
			<View style={styles.root}>
				<Text style={styles.feedbackText}>{t('stats.loadingMessage')}</Text>
			</View>
		);
	}

	if (error && !data) {
		return (
			<View style={styles.root}>
				<Text style={styles.feedbackText}>{t('stats.loadErrorMessage')}</Text>
			</View>
		);
	}

	if (!data) {
		return (
			<View style={styles.root}>
				<Text style={styles.feedbackText}>{t('stats.notAvailableMessage')}</Text>
			</View>
		);
	}

	const defenseRows = [
		data.typeDefenses.slice(0, TYPE_DEFENSES_ROW_SIZE),
		data.typeDefenses.slice(TYPE_DEFENSES_ROW_SIZE, TYPE_DEFENSES_ROW_SIZE * 2),
	];

	const defenseTargetName =
		displayName && displayName !== '--' ? displayName : t('stats.typeDefensesFallbackName');

	const typeDefensesDescription = `${t('stats.typeDefensesDescriptionPrefix')} ${defenseTargetName}${t('stats.typeDefensesDescriptionSuffix')}`;

	return (
		<View style={styles.root}>
			<View style={styles.sectionList}>
				<View style={styles.section}>
					<Text style={[styles.sectionTitleText, { color: sectionTitleColor }]}>
						{t('stats.baseStatsTitle')}
					</Text>

					<View style={styles.baseStatColumn}>
						{data.baseStats.map(row => (
							<View
								key={row.key}
								style={styles.baseStatRow}
							>
								<Text
									style={styles.rowLabel}
									numberOfLines={1}
									adjustsFontSizeToFit
								>
									{row.label}
								</Text>
								<Text style={styles.baseStatValue}>{formatStatValue(row.value)}</Text>

								<View style={styles.baseStatTrack}>
									<View
										style={[
											styles.baseStatTrackFill,
											{
												backgroundColor: sectionTitleColor,
												width:
													row.value === null
														? 0
														: `${Math.max(row.barFillRatio * 100, BAR_MIN_VISIBLE_WIDTH)}%`,
											},
										]}
									/>
								</View>

								<Text style={styles.baseStatValueRange}>{formatStatValue(row.min)}</Text>
								<Text style={styles.baseStatValueRange}>{formatStatValue(row.max)}</Text>
							</View>
						))}

						<View style={styles.baseStatRow}>
							<Text style={styles.rowLabel}>{t('stats.totalLabel')}</Text>
							<Text
								adjustsFontSizeToFit
								numberOfLines={1}
								style={styles.totalValue}
							>
								{formatStatValue(data.totalBaseStat)}
							</Text>
							<View style={[styles.baseStatTrack, styles.totalStatTrack]} />
							<Text style={styles.totalLabel}>{t('stats.minLabel')}</Text>
							<Text style={styles.totalLabel}>{t('stats.maxLabel')}</Text>
						</View>
					</View>

					<Text style={styles.noteText}>{t('stats.note')}</Text>
				</View>

				<View style={styles.section}>
					<Text style={[styles.sectionTitleText, { color: sectionTitleColor }]}>
						{t('stats.typeDefensesTitle')}
					</Text>
					<Text style={styles.defenseDescription}>{typeDefensesDescription}</Text>

					<View style={styles.defenseGrid}>
						{defenseRows.map((row, rowIndex) => (
							<View
								key={`defense-row-${rowIndex}`}
								style={styles.defenseRow}
							>
								{row.map(defense => {
									const isNeutral = defense.multiplierLabel.length === 0;

									return (
										<View
											key={defense.type}
											style={styles.defenseItem}
										>
											<View
												style={[styles.defenseBadge, { backgroundColor: typeColors[defense.type] }]}
											>
												<PokemonTypeIcon
													type={defense.type}
													fill={textColor.light}
													size={15}
												/>
											</View>

											<Text
												style={[
													styles.defenseMultiplier,
													isNeutral ? styles.defenseMultiplierHidden : undefined,
												]}
											>
												{isNeutral ? NEUTRAL_MULTIPLIER_PLACEHOLDER : defense.multiplierLabel}
											</Text>
										</View>
									);
								})}
							</View>
						))}
					</View>
				</View>
			</View>
		</View>
	);
};

export default Stats;
