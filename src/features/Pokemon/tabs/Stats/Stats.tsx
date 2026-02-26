import PokemonTypeIcon from '@components/PokemonTypeIcon';
import { textColor, typeColors } from '@constants/colors';
import { Text, View } from 'react-native';

import { useStyles } from './styles';
import type { PokemonStatsProps } from './types';

const BASE_STATS_TITLE = 'Base Stats';
const TYPE_DEFENSES_TITLE = 'Type Defenses';
const STATS_LOADING_MESSAGE = 'Loading stats data...';
const STATS_LOAD_ERROR_MESSAGE = 'Could not load stats data right now.';
const STATS_NOT_AVAILABLE_MESSAGE = 'Stats are not available right now.';
const TYPE_DEFENSES_DESCRIPTION_PREFIX = 'The effectiveness of each type on';
const TYPE_DEFENSES_DESCRIPTION_SUFFIX = '.';
const TYPE_DEFENSES_FALLBACK_NAME = 'this Pokémon';
const TYPE_DEFENSES_ROW_SIZE = 9;
const BAR_MIN_VISIBLE_WIDTH = 2;
const TOTAL_LABEL = 'Total';
const MIN_LABEL = 'Min';
const MAX_LABEL = 'Max';
const NEUTRAL_MULTIPLIER_PLACEHOLDER = '1';
const STATS_NOTE =
	'The ranges shown on the right are for a level 100 Pokémon. Maximum values are based on a beneficial nature, 252 EVs, 31 IVs; minimum values are based on a hindering nature, 0 EVs, 0 IVs.';

const formatStatValue = (value: number | null) => (value === null ? '--' : value.toString());

const Stats = ({ data, displayName, error, isLoading, primaryType }: PokemonStatsProps) => {
	const styles = useStyles();
	const sectionTitleColor = typeColors[primaryType];

	if (isLoading && !data) {
		return (
			<View style={styles.root}>
				<Text style={styles.feedbackText}>{STATS_LOADING_MESSAGE}</Text>
			</View>
		);
	}

	if (error && !data) {
		return (
			<View style={styles.root}>
				<Text style={styles.feedbackText}>{STATS_LOAD_ERROR_MESSAGE}</Text>
			</View>
		);
	}

	if (!data) {
		return (
			<View style={styles.root}>
				<Text style={styles.feedbackText}>{STATS_NOT_AVAILABLE_MESSAGE}</Text>
			</View>
		);
	}

	const defenseRows = [
		data.typeDefenses.slice(0, TYPE_DEFENSES_ROW_SIZE),
		data.typeDefenses.slice(TYPE_DEFENSES_ROW_SIZE, TYPE_DEFENSES_ROW_SIZE * 2),
	];

	const defenseTargetName =
		displayName && displayName !== '--' ? displayName : TYPE_DEFENSES_FALLBACK_NAME;

	const typeDefensesDescription = `${TYPE_DEFENSES_DESCRIPTION_PREFIX} ${defenseTargetName}${TYPE_DEFENSES_DESCRIPTION_SUFFIX}`;

	return (
		<View style={styles.root}>
			<View style={styles.sectionList}>
				<View style={styles.section}>
					<Text style={[styles.sectionTitleText, { color: sectionTitleColor }]}>
						{BASE_STATS_TITLE}
					</Text>

					<View style={styles.baseStatColumn}>
						{data.baseStats.map(row => (
							<View
								key={row.key}
								style={styles.baseStatRow}
							>
								<Text style={styles.rowLabel}>{row.label}</Text>
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
							<Text style={styles.rowLabel}>{TOTAL_LABEL}</Text>
							<Text
								adjustsFontSizeToFit
								numberOfLines={1}
								style={styles.totalValue}
							>
								{formatStatValue(data.totalBaseStat)}
							</Text>
							<View style={styles.baseStatTrack} />
							<Text style={styles.totalLabel}>{MIN_LABEL}</Text>
							<Text style={styles.totalLabel}>{MAX_LABEL}</Text>
						</View>
					</View>

					<Text style={styles.noteText}>{STATS_NOTE}</Text>
				</View>

				<View style={styles.section}>
					<Text style={[styles.sectionTitleText, { color: sectionTitleColor }]}>
						{TYPE_DEFENSES_TITLE}
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
