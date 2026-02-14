import CustomTab from '@components/Tabs/CustomTab';
import { typeBgColors, typeColors } from '@constants/colors';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGetPokemonEvolutions } from '@hooks/useGetPokemonEvolution';
import { BASE_DELAY, BASE_FADE_IN_DURATION, fadeInAnim } from '@utils/animations';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import EvolutionChain from './components/EvolutionChain';

const EvolutionChart = () => {
	const router = useRouter();
	const { bottom } = useSafeAreaInsets();

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
			style={{ flex: 1 }}
		>
			<Animated.View
				entering={fadeInAnim(BASE_FADE_IN_DURATION)}
				className='absolute top-1/2 left-5'
				style={{
					marginTop: 60,
					transformOrigin: 'left center',
					transform: [{ rotate: '270deg' }],
					width: 'auto',
				}}
			>
				<Text className='text-base font-bold uppercase leading-5'>Evolution Chart</Text>
			</Animated.View>

			{isLoading && (
				<View className='flex-1 items-center justify-center'>
					<ActivityIndicator
						size='large'
						color={'white'}
					/>
				</View>
			)}

			{!isLoading && evolutionData && (
				<Animated.ScrollView
					entering={fadeInAnim(BASE_DELAY)}
					contentContainerStyle={{
						flex: 1,
						justifyContent: 'center',
						paddingBottom: 30,
					}}
				>
					<EvolutionChain
						evolution={evolutionData}
						type={type as keyof typeof typeColors}
						depth={0}
						direction='right'
					/>
				</Animated.ScrollView>
			)}

			<View
				className='absolute bottom-0 self-center'
				style={{ paddingBottom: bottom + 10 }}
			>
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
