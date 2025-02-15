import React, { lazy, Suspense } from 'react';
import styles from './styles';
import Animated from 'react-native-reanimated';
import { Image } from 'moti';
import { fadeInAnim } from '@utils/animations';
import { View } from 'react-native';

const Pokeball = lazy(() => import('@assets/images/pokeball-full.svg'));
const DEFAULT_SIZE = 100;

interface PokemonImageProps {
	imgUrl: string;
	pokemon: string;
	delay: number;
	size?: number;
	fontSize?: number;
	trigger?: string | null | undefined;
	pokeballFillColor?: string;
	pokeballStrokeColor?: string;
	pokeballOpacity?: number;
}

const PokemonImage = ({
	imgUrl,
	pokemon,
	delay,
	size = DEFAULT_SIZE,
	fontSize = 20,
	trigger,
	pokeballFillColor = 'white',
	pokeballStrokeColor = 'white',
	pokeballOpacity = 0.2,
}: PokemonImageProps) => {
	return (
		<View>
			<Animated.View
				entering={fadeInAnim(delay)}
				style={styles.pokeContainer}
			>
				<Suspense fallback={null}>
					<Pokeball
						width={size}
						height={size}
						style={{ position: 'absolute' }}
						fill={pokeballFillColor}
						stroke={pokeballStrokeColor}
						fillOpacity={pokeballOpacity}
						strokeOpacity={pokeballOpacity}
					/>
				</Suspense>
				<Image
					src={imgUrl}
					style={{
						width: size,
						height: size,
						zIndex: 1,
					}}
				/>
			</Animated.View>

			<View style={styles.textWrapper}>
				{trigger && (
					<Animated.Text
						entering={fadeInAnim(delay)}
						style={[styles.pokeTrigger, { fontSize: fontSize * 0.5 }]}
					>
						({trigger})
					</Animated.Text>
				)}
				<Animated.Text
					entering={fadeInAnim(delay)}
					style={[styles.pokeName, { fontSize }]}
				>
					{pokemon}
				</Animated.Text>
			</View>
		</View>
	);
};

export default PokemonImage;
