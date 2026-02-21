import CustomTab from '@components/Tabs/CustomTab';
import { typeBgColors, typeColors } from '@constants/colors';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGetPokemonEvolutions } from '@hooks/useGetPokemonEvolution';
import { BASE_DELAY, BASE_FADE_IN_DURATION, fadeInAnim } from '@utils/animations';
import texts from '@utils/texts.json';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import EvolutionChain from './components/EvolutionChain';
import { useStyles } from './styles';

const EvolutionChart = () => {
	const router = useRouter();
	const styles = useStyles();

	const { id, type } = useLocalSearchParams();
	const { data: evolutionData, isLoading } = useGetPokemonEvolutions(id as string);

	return (
		<LinearGradient
			colors={[
				typeBgColors[type as keyof typeof typeBgColors],
				typeColors[type as keyof typeof typeColors],
			]}
			start={{ x: 0, y: 0 }}
			end={{ x: 2, y: 1 }}
			style={styles.container}
		>
			<Animated.View
				entering={fadeInAnim(BASE_FADE_IN_DURATION)}
				style={styles.titleContainer}
			>
				<Text style={styles.title}>{texts.evolution.chartTitle}</Text>
			</Animated.View>

			{isLoading && (
				<View style={styles.loadingContainer}>
					<ActivityIndicator
						size='large'
						color={'white'}
					/>
				</View>
			)}

			{!isLoading && evolutionData && (
				<Animated.ScrollView
					entering={fadeInAnim(BASE_DELAY)}
					contentContainerStyle={styles.contentContainer}
				>
					<EvolutionChain
						evolution={evolutionData}
						type={type as keyof typeof typeColors}
						depth={0}
						direction='right'
					/>
				</Animated.ScrollView>
			)}

			<View style={styles.closeButtonContainer}>
				<CustomTab
					isRounded
					isFocused
					activeBackgroundColor={typeColors.fighting}
					tabBarIcon={({ color, size }) => (
						<MaterialCommunityIcons
							name='close'
							size={size}
							color={color}
						/>
					)}
					onPress={() => router.back()}
				/>
			</View>
		</LinearGradient>
	);
};

export default EvolutionChart;
