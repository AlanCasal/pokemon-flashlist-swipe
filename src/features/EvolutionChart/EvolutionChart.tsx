import { typeBgColors, typeColors } from '@constants/colors';
import texts from '@utils/texts.json';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Text, View } from 'react-native';
import {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';

import EvolutionChain from './components/EvolutionChain';
import PokemonBody from './components/PokemonBody';
import PokemonHeader from './components/PokemonHeader';
import { useEvolutionChartController } from './hooks/useEvolutionChartController';
import { useStyles } from './styles';
import type { EvolutionTab } from './types';

// This is the vertical distance between collapsed and expanded top-layer coordinates in Figma.
const EXPANDED_TOP_LAYER_OFFSET = -160;
const COLLAPSED_HERO_EXIT_OFFSET = -60;

const EvolutionChart = () => {
	const styles = useStyles();
	const {
		activeTab,
		displayName,
		evolutionData,
		evolutionError,
		formattedId,
		hasPokemonId,
		heroImageUrl,
		isEvolutionLoading,
		isPokemonLoading,
		isSaved,
		onTabPress,
		primaryType,
		tabConfig,
		typeChips,
	} = useEvolutionChartController();
	const animatedSheetIndex = useSharedValue(0);

	const movingTopLayerStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(
					animatedSheetIndex.value,
					[0, 1],
					[0, EXPANDED_TOP_LAYER_OFFSET],
					Extrapolation.CLAMP,
				),
			},
		],
	}));

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
		if (tab !== 'evolution') {
			return (
				<View style={styles.placeholderContainer}>
					<Text style={styles.placeholderText}>{texts.evolution.wipMessage}</Text>
				</View>
			);
		}

		if (!hasPokemonId) {
			return (
				<View style={styles.placeholderContainer}>
					<Text style={styles.feedbackText}>{texts.evolution.missingDetailsMessage}</Text>
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
				<Text style={styles.evolutionTitle}>{texts.evolution.chartTitle}</Text>

				<EvolutionChain
					evolution={evolutionData}
					type={primaryType}
					depth={0}
					direction='right'
				/>
			</View>
		);
	};

	return (
		<LinearGradient
			colors={[typeBgColors[primaryType], typeColors[primaryType]]}
			start={{ x: 0, y: 0 }}
			end={{ x: 2, y: 1 }}
			style={styles.container}
		>
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
				movingTopLayerStyle={movingTopLayerStyle}
				onTabPress={onTabPress}
				tabConfig={tabConfig}
			>
				{renderTabContent(activeTab)}
			</PokemonBody>
		</LinearGradient>
	);
};

export default EvolutionChart;
