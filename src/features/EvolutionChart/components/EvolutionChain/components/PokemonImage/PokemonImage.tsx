import Pokeball from '@assets/images/pokeball-full.svg';
import { fadeInAnim } from '@utils/animations';
import { Image } from 'moti';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useStyles } from './styles';
import type { PokemonImageProps } from './types';

const DEFAULT_SIZE = 100;

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
	const triggerText = trigger ? `(${trigger})` : '';
	const styles = useStyles({ fontSize, size });

	return (
		<View>
			<Animated.View
				entering={fadeInAnim(delay)}
				style={styles.container}
			>
				<Pokeball
					width={size}
					height={size}
					style={styles.pokeball}
					fill={pokeballFillColor}
					stroke={pokeballStrokeColor}
					fillOpacity={pokeballOpacity}
					strokeOpacity={pokeballOpacity}
				/>
				<Image
					src={imgUrl}
					style={styles.image}
				/>
			</Animated.View>

			<View style={styles.textContainer}>
				{trigger && (
					<Animated.Text
						entering={fadeInAnim(delay)}
						style={styles.trigger}
					>
						{triggerText}
					</Animated.Text>
				)}
				<Animated.Text
					entering={fadeInAnim(delay)}
					style={styles.name}
				>
					{pokemon}
				</Animated.Text>
			</View>
		</View>
	);
};

export default PokemonImage;
