import DotsSmall from '@assets/images/dots-small.svg';
import { textColor } from '@constants/colors';
import { View } from 'react-native';

import type { DotsProps } from './types';

const DEFAULT_DOTS_SIZE = 160;
const DEFAULT_DOTS_OPACITY = 0.15;
const DEFAULT_DOTS_POSITION = 'absolute';

const Dots = ({
	position,
	size = DEFAULT_DOTS_SIZE,
	color = textColor.light,
	opacity = DEFAULT_DOTS_OPACITY,
	testID,
}: DotsProps) => (
	<View
		testID={testID}
		style={[
			{
				position: DEFAULT_DOTS_POSITION,
				opacity,
			},
			position,
		]}
	>
		<DotsSmall
			width={size}
			height={size}
			fill={color}
		/>
	</View>
);

export default Dots;
