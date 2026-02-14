import { ReactNode } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useIsFocused } from '@react-navigation/native';
import { MotiView } from 'moti';

type FadeInWrapperProps = {
	children: ReactNode;
	duration?: number;
};

const FadeInWrapper = ({ children, duration = 300 }: FadeInWrapperProps) => {
	const isFocused = useIsFocused();

	return (
		<MotiView
			from={{ opacity: 0 }}
			animate={{ opacity: isFocused ? 1 : 0 }}
			transition={{ type: 'timing', duration }}
			style={{ flex: 1 }}
		>
			{children}
		</MotiView>
	);
};

export default FadeInWrapper;
