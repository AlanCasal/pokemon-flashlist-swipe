import { typeBgColors, typeColors } from '@constants/colors';
import texts from '@utils/texts.json';
import { ActivityIndicator, Text, View } from 'react-native';
import {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';

import PokemonBody from './components/PokemonBody';
import PokemonHeader from './components/PokemonHeader';
import { usePokemonController } from './hooks/usePokemonController';
import { useStyles } from './styles';
import About from './tabs/About';
import Evolution from './tabs/Evolution';
import type { EvolutionTab } from './types';

const COLLAPSED_HERO_EXIT_OFFSET = -60;

const Pokemon = () => {
	const styles = useStyles();
	const {
		activeTab,
		aboutData,
		aboutError,
		displayName,
		evolutionData,
		evolutionError,
		formattedId,
		hasPokemonId,
		isAboutLoading,
		heroImageUrl,
		isEvolutionLoading,
		isPokemonLoading,
		isSaved,
		onEvolutionPokemonPress,
		onTabPress,
		primaryType,
		savedPokemons,
		selectedPokemonName,
		tabConfig,
		typeChips,
	} = usePokemonController();
	const animatedSheetIndex = useSharedValue(0);
	const animatedSheetPosition = useSharedValue(0);

	const heroStyle = useAnimatedStyle(() => ({
		opacity: interpolate(animatedSheetIndex.value, [0, 1], [1, 0], Extrapolation.CLAMP),
		transform: [
			{
				translateY: interpolate(
					animatedSheetIndex.value,
					[0, 1],
					[0, COLLAPSED_HERO_EXIT_OFFSET],
					Extrapolation.CLAMP,
				),
			},
		],
	}));

	const compactTitleStyle = useAnimatedStyle(() => ({
		opacity: interpolate(animatedSheetIndex.value, [0, 0.5, 1], [0, 0.25, 1], Extrapolation.CLAMP),
		transform: [
			{
				translateY: interpolate(animatedSheetIndex.value, [0, 1], [14, 0], Extrapolation.CLAMP),
			},
		],
	}));

	const renderTabContent = (tab: EvolutionTab) => {
		if (!hasPokemonId) {
			return (
				<View style={styles.placeholderContainer}>
					<Text style={styles.feedbackText}>{texts.evolution.missingDetailsMessage}</Text>
				</View>
			);
		}

		if (tab === 'about') {
			return (
				<About
					data={aboutData}
					error={aboutError}
					isLoading={isAboutLoading}
					primaryType={primaryType}
				/>
			);
		}

		if (tab === 'stats') {
			return (
				<View style={styles.placeholderContainer}>
					<Text style={styles.placeholderText}>{texts.evolution.wipMessage}</Text>
				</View>
			);
		}

		if (isEvolutionLoading) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator
						size='large'
						color={typeColors[primaryType]}
					/>
				</View>
			);
		}

		if (evolutionError || !evolutionData) {
			return (
				<View style={styles.placeholderContainer}>
					<Text style={styles.feedbackText}>{texts.evolution.loadErrorMessage}</Text>
				</View>
			);
		}

		return (
			<View style={styles.evolutionContainer}>
				<Evolution
					evolution={evolutionData}
					savedPokemons={savedPokemons}
					selectedPokemonName={selectedPokemonName}
					type={primaryType}
					onPokemonPress={onEvolutionPokemonPress}
					depth={0}
					direction='right'
				/>
			</View>
		);
	};

	return (
		<View style={[styles.container, { backgroundColor: typeBgColors[primaryType] }]}>
			<PokemonHeader
				compactTitleStyle={compactTitleStyle}
				displayName={displayName}
				formattedId={formattedId}
				heroImageUrl={heroImageUrl}
				heroStyle={heroStyle}
				isPokemonLoading={isPokemonLoading}
				isSaved={isSaved}
				typeChips={typeChips}
			/>

			<PokemonBody
				activeTab={activeTab}
				animatedSheetIndex={animatedSheetIndex}
				animatedSheetPosition={animatedSheetPosition}
				onTabPress={onTabPress}
				tabConfig={tabConfig}
			>
				{renderTabContent(activeTab)}
			</PokemonBody>
		</View>
	);
};

export default Pokemon;
