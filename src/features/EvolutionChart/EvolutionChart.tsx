import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from './styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { typeBgColors, typeColors } from '@constants/colors';
import { useGetPokemonEvolutions } from '@hooks/useGetPokemonEvolution';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import CustomTab from '@components/Tabs/CustomTab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	BASE_DELAY,
	BASE_FADE_IN_DURATION,
	fadeInAnim,
} from '@utils/animations';
import EvolutionChain from './components/EvolutionChain';

const EvolutionChart = () => {
	const router = useRouter();
	const { bottom } = useSafeAreaInsets();

	const { id, type } = useLocalSearchParams();
	const { data: evolutionData, isLoading } = useGetPokemonEvolutions(
		id as string
	);

	return (
		<LinearGradient
			colors={[
				typeBgColors[type as keyof typeof typeBgColors],
				typeColors[type as keyof typeof typeColors],
			]}
			start={{ x: 0, y: 0 }}
			end={{ x: 2, y: 1 }}
			style={{ flex: 1 }}
		>
			<Animated.View
				entering={fadeInAnim(BASE_FADE_IN_DURATION)}
				style={styles.titleWrapper}
			>
				<Text style={styles.title}>Evolution Chart</Text>
			</Animated.View>

			{isLoading && (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
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

			<View style={[styles.bottomTabContainer, { paddingBottom: bottom + 10 }]}>
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
