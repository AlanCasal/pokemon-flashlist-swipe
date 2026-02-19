import { typeColors } from '@constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { type ColorValue, View } from 'react-native';

import styles from './styles';

type PokedexEdgeGradientPosition = 'top' | 'bottom';

type PokedexEdgeGradientProps = {
	position: PokedexEdgeGradientPosition;
};

const PokedexEdgeGradient = ({ position }: PokedexEdgeGradientProps) => {
	const positionStyle = position === 'top' ? styles.positionTop : styles.positionBottom;

	const gradientColors: readonly [ColorValue, ColorValue, ColorValue] =
		position === 'top'
			? [`${typeColors.dragon}F2`, `${typeColors.dragon}22`, 'transparent']
			: ['transparent', `${typeColors.dragon}22`, `${typeColors.dragon}F2`];

	return (
		<View
			pointerEvents='none'
			style={[styles.container, positionStyle]}
		>
			<LinearGradient
				colors={gradientColors}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
				style={styles.gradientFill}
			/>
		</View>
	);
};

export default PokedexEdgeGradient;
