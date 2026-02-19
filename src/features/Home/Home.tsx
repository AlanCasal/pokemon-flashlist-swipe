import { Marquee } from '@animatereactnative/marquee';
import Pokeball from '@assets/images/pokeball-full.svg';
import { pokeballColors, typeColors } from '@constants/colors';
import usePokemonSprites from '@hooks/usePokemonSprites';
import { useQueryClient } from '@tanstack/react-query';
import { chunkArray, toTransparent } from '@utils/helpers';
import texts from '@utils/texts.json';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { createSpriteTileStyles, useStyles } from './styles';

const BG_COLOR = typeColors.dragon;
const MARQUEE_SPEED = 0.5;
const SPACING = 8;
const ITEM_SIZE = Dimensions.get('window').width * 0.45;
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Home = () => {
	const { data, isLoading, hasError } = usePokemonSprites();
	const router = useRouter();
	const queryClient = useQueryClient();
	const styles = useStyles({ itemSize: ITEM_SIZE });
	const formattedArray = useMemo(() => {
		const chunkSize = Math.max(1, Math.ceil(data.length / 3));
		return chunkArray(data, chunkSize);
	}, [data]);

	useEffect(() => {
		if (!hasError) return;
		Alert.alert(texts.alerts.errorTitle, texts.alerts.errorFetchingPokemonMessage);
	}, [hasError]);

	const handleStart = useCallback(() => {
		queryClient.removeQueries({ queryKey: ['pokemon'] });
		router.push('/pokedex');
	}, [queryClient, router]);

	if (isLoading || data.length === 0) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	if (hasError) {
		return (
			<View>
				<Text>{texts.home.fallbackErrorText}</Text>
			</View>
		);
	}

	return (
		<View style={styles.root}>
			<StatusBar style='light' />

			<View style={styles.root}>
				<Animated.View
					style={styles.marqueeAbsoluteFill}
					entering={FadeIn.springify().damping(12).delay(300).duration(3000)}
				>
					<View style={styles.marqueeColumns}>
						{formattedArray.map((column, columnIndex) => (
							<Marquee
								key={`marquee-${columnIndex}`}
								spacing={SPACING}
								reverse={columnIndex % 2 !== 0}
								speed={MARQUEE_SPEED}
								style={styles.marqueeRowHeight}
							>
								<View style={styles.marqueeRow}>
									{column.map(({ image, type }, imageIndex) => (
										<View
											key={`image-column-${columnIndex}-${imageIndex}`}
											style={[
												styles.spriteTile,
												createSpriteTileStyles({ type: type as keyof typeof typeColors })
													.spriteTileBackground,
											]}
										>
											<Image
												source={{ uri: image }}
												style={styles.spriteImage}
											/>
											<View style={styles.spriteOverlay}>
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
					style={styles.topGradient}
					pointerEvents='none'
				/>
			</View>

			<View style={styles.footer}>
				<Image
					source={require('@assets/images/pokedex-logo.png')}
					contentFit='contain'
					style={styles.logo}
				/>
				<Text style={styles.subtitle}>{texts.home.heroSubtitle}</Text>

				<AnimatedTouchableOpacity
					onPress={handleStart}
					entering={FadeInDown.springify().damping(30).delay(300)}
					style={styles.startButtonWrapper}
					activeOpacity={0.8}
				>
					<View style={styles.startButton}>
						<Text style={styles.startButtonLabel}>{texts.home.startButton}</Text>
					</View>
				</AnimatedTouchableOpacity>
			</View>
		</View>
	);
};

export default Home;
