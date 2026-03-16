// @ts-nocheck
import { render } from '@testing-library/react-native';

import ScrollToTop from './ScrollToTop';

jest.mock('@expo/vector-icons', () => ({
	MaterialCommunityIcons: 'MaterialCommunityIcons',
}));
jest.mock('moti', () => {
	const React = jest.requireActual('react');

	return {
		MotiView: ({ children, ...props }) => React.createElement('MotiView', props, children),
	};
});
jest.mock('./useStyles', () => ({
	useStyles: () => ({
		button: { bottom: 10, right: 16 },
		touchable: { width: 56, height: 56 },
	}),
}));

describe('ScrollToTop', () => {
	it('shows the animated visible state when visible is true', () => {
		const { UNSAFE_getByProps: unsafeGetByProps } = render(
			<ScrollToTop
				visible
				onPress={jest.fn()}
				bottomInset={0}
			/>,
		);

		const container = unsafeGetByProps({ testID: 'scroll-to-top-container' });

		expect(container.props.pointerEvents).toBe('auto');
		expect(container.props.animate).toEqual({
			opacity: 1,
			translateY: 0,
		});
	});

	it('shows the animated hidden state when visible is false', () => {
		const { UNSAFE_getByProps: unsafeGetByProps } = render(
			<ScrollToTop
				visible={false}
				onPress={jest.fn()}
				bottomInset={0}
			/>,
		);

		const container = unsafeGetByProps({ testID: 'scroll-to-top-container' });

		expect(container.props.pointerEvents).toBe('none');
		expect(container.props.animate.opacity).toBe(0);
		expect(container.props.animate.translateY).toBeGreaterThan(0);
	});
});
