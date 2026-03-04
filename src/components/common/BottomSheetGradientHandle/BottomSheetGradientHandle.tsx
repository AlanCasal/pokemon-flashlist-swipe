import { typeColors } from '@constants/colors';
import { type BottomSheetHandleProps } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { JSX, memo } from 'react';
import { View } from 'react-native';

import styles from './styles';

const BottomSheetGradientHandle: (props: BottomSheetHandleProps) => JSX.Element = () => (
	<View style={styles.container}>
		<LinearGradient
			colors={[typeColors.psychic, typeColors.dragon]}
			start={{ x: 0, y: 0.5 }}
			end={{ x: 1, y: 0.5 }}
			style={styles.indicator}
		/>
	</View>
);

export default memo(BottomSheetGradientHandle);
