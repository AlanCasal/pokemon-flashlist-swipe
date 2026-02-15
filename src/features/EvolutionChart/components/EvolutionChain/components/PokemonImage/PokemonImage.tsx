import Pokeball from '@assets/images/pokeball-full.svg';
import { PRIMARY_FONT } from '@constants/sharedStyles';
import { fadeInAnim } from '@utils/animations';
import { Image } from 'moti';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

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

	return (
		<View>
			<Animated.View
				entering={fadeInAnim(delay)}
				className='items-center'
			>
				<Pokeball
					width={size}
					height={size}
					style={{ position: 'absolute' }}
					fill={pokeballFillColor}
					stroke={pokeballStrokeColor}
					fillOpacity={pokeballOpacity}
					strokeOpacity={pokeballOpacity}
				/>
				<Image
					src={imgUrl}
					style={{
						width: size,
						height: size,
						zIndex: 1,
					}}
				/>
			</Animated.View>

			<View className='mt-2'>
				{trigger && (
					<Animated.Text
						entering={fadeInAnim(delay)}
						className='text-center font-bold uppercase'
						style={{ fontSize: fontSize * 0.5 }}
					>
						{triggerText}
					</Animated.Text>
				)}
				<Animated.Text
					entering={fadeInAnim(delay)}
					className='text-center capitalize'
					style={{ fontSize, fontFamily: PRIMARY_FONT }}
				>
					{pokemon}
				</Animated.Text>
			</View>
		</View>
	);
};

export default PokemonImage;
