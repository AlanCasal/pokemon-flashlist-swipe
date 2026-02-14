import { Marquee } from '@animatereactnative/marquee';
import Pokeball from '@assets/images/pokeball-full.svg';
import { pokeballColors, textColor, typeBgColors, typeColors } from '@constants/colors';
import { PRIMARY_FONT } from '@constants/sharedStyles';
import usePokemonSprites from '@hooks/usePokemonSprites';
import { useQueryClient } from '@tanstack/react-query';
import { chunkArray, toTransparent } from '@utils/helpers';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import styles from './styles';

const BG_COLOR = typeColors.dragon;
const MARQUEE_SPEED = 0.5;
const SPACING = 8;
const ITEM_SIZE = Dimensions.get('window').width * 0.45;
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Home = () => {
	const { data, isLoading, hasError } = usePokemonSprites();
	const router = useRouter();
	const queryClient = useQueryClient();

	if (isLoading || data.length === 0) {
		return (
			<View className='flex-1 items-center justify-center'>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	if (hasError) {
		Alert.alert('Error', 'Failed to fetch some Pokemon data.');
		return (
			<View>
				<Text>An error occurred.</Text>
			</View>
		);
	}

	const formattedArray = chunkArray(data, Math.floor(data.length / 3));

	const handleStart = () => {
		queryClient.removeQueries({ queryKey: ['pokemon'] });
		router.push('/pokedex');
	};

	return (
		<View
			className='flex-1 overflow-hidden'
			style={{ backgroundColor: typeColors.dragon }}
		>
			<StatusBar style='light' />

			<View className='relative flex-1 overflow-hidden'>
				<Animated.View
					className='absolute inset-0'
					entering={FadeIn.springify().damping(12).delay(300).duration(3000)}
				>
					<View
						className='flex-1 gap-2'
						style={{ transform: [{ rotate: '-4deg' }] }}
					>
						{formattedArray.map((column, columnIndex) => (
							<Marquee
								key={`marquee-${columnIndex}`}
								spacing={SPACING}
								reverse={columnIndex % 2 !== 0}
								speed={MARQUEE_SPEED}
								style={{ height: ITEM_SIZE }}
							>
								<View className='flex-row gap-2'>
									{column.map(({ image, type }, imageIndex) => (
										<View
											key={`image-column-${columnIndex}-${imageIndex}`}
											className='relative overflow-hidden rounded-lg'
											style={{
												backgroundColor: typeBgColors[type as keyof typeof typeColors],
											}}
										>
											<Image
												source={{ uri: image }}
												style={{ width: ITEM_SIZE, aspectRatio: 1, zIndex: 1 }}
											/>
											<View className='absolute inset-0 p-[10px] opacity-50'>
												<Pokeball
													width='100%'
													height='100%'
													fill={pokeballColors.white}
													fillOpacity={0.3}
												/>
											</View>
										</View>
									))}
								</View>
							</Marquee>
						))}
					</View>
				</Animated.View>

				<LinearGradient
					colors={[BG_COLOR, BG_COLOR, toTransparent(BG_COLOR)]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					locations={[0, 0.15, 1]}
					style={[styles.gradient, styles.topGradient]}
					pointerEvents='none'
				/>

				<LinearGradient
					colors={[toTransparent(BG_COLOR), BG_COLOR, BG_COLOR]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					locations={[0, 0.7, 1]}
					style={[styles.gradient, styles.bottomGradient]}
					pointerEvents='none'
				/>
			</View>

			<View
				className='items-center gap-2'
				style={{ flex: 0.5 }}
			>
				<Image
					source={require('@assets/images/pokedex-logo.png')}
					contentFit='contain'
					style={{ width: 200, height: 80 }}
				/>
				<Text
					className='text-center text-[18px]'
					style={{ fontFamily: PRIMARY_FONT, color: textColor.primary }}
				>
					Search for any Pokémon {'\n'} that exists on the planet !
				</Text>

				<AnimatedTouchableOpacity
					onPress={handleStart}
					entering={FadeInDown.springify().damping(30).delay(300)}
					className='mt-4'
					activeOpacity={0.8}
				>
					<View
						className='h-12 w-[200px] items-center justify-center rounded-full border-2'
						style={{
							backgroundColor: pokeballColors.red,
							borderColor: pokeballColors.black,
						}}
					>
						<Text
							className='text-[18px]'
							style={{
								color: textColor.primary,
								fontFamily: PRIMARY_FONT,
							}}
						>
							Start
						</Text>
					</View>
				</AnimatedTouchableOpacity>
			</View>
		</View>
	);
};

export default Home;
