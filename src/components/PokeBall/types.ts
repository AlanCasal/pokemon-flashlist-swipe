import { StyleProp, ViewStyle } from 'react-native';

export interface PokeBallProps {
	handleOnPress?: () => void;
	isSaved?: boolean;
	size?: number;
	containerStyles?: StyleProp<ViewStyle>;
	isDisabled?: boolean;
	enablePopAnimation?: boolean;
}
