import { typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { type ColorValue, View } from 'react-native';

type PokedexEdgeGradientPosition = 'top' | 'bottom';

type PokedexEdgeGradientProps = {
	position: PokedexEdgeGradientPosition;
};

const PokedexEdgeGradient = ({ position }: PokedexEdgeGradientProps) => {
	const gradientColors: readonly [ColorValue, ColorValue, ColorValue] =
		position === 'top'
			? [`${typeColors.dragon}F2`, `${typeColors.dragon}22`, 'transparent']
			: ['transparent', `${typeColors.dragon}22`, `${typeColors.dragon}F2`];

	return (
		<View
			className={`absolute right-0 left-0 h-47.5 w-full ${position === 'top' ? 'top-0' : 'bottom-0'}`}
			pointerEvents='none'
			style={{ zIndex: sharedStyles.zIndex.headerGradient }}
		>
			<LinearGradient
				colors={gradientColors}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
				style={{ position: 'absolute', inset: 0 }}
			/>
		</View>
	);
};

export default PokedexEdgeGradient;
