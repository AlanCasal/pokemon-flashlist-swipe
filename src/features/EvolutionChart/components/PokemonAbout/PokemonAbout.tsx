import { typeColors } from '@constants/colors';
import texts from '@utils/texts.json';
import { Text, View } from 'react-native';

import { PokemonAboutRow } from './components';
import { useStyles } from './styles';
import type { PokemonAboutProps } from './types';

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
