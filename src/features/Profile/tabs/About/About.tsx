import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import type { ProfileAboutProps } from '../../types';
import { useStyles } from './styles';

const About = ({ data, isLoading }: ProfileAboutProps) => {
	const styles = useStyles();
	const { t } = useTranslation();

	if (isLoading) {
		return (
			<View style={styles.root}>
				<Text style={styles.fallbackText}>{t('profile.about.loadingMessage')}</Text>
			</View>
		);
	}

	return (
		<View style={styles.root}>
			<View style={styles.sectionList}>
				{data.sections.map(section => (
					<View
						key={section.title}
						style={styles.section}
					>
						<Text style={styles.sectionTitle}>{section.title}</Text>

						<View style={styles.sectionRows}>
							{section.rows.map(row => (
								<View
									key={`${section.title}-${row.label}`}
									style={styles.row}
								>
									<Text style={styles.rowLabel}>{row.label}</Text>
									<Text style={styles.rowValue}>{row.value}</Text>
								</View>
							))}
						</View>
					</View>
				))}
			</View>
		</View>
	);
};

export default About;
