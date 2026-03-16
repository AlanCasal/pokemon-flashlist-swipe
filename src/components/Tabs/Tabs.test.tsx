// @ts-nocheck
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { render } from '@testing-library/react-native';

import Tabs from './Tabs';

jest.mock('moti', () => {
	const React = jest.requireActual('react');

	return {
		MotiView: ({ children, ...props }) => React.createElement('MotiView', props, children),
	};
});
jest.mock('./CustomTab', () => ({
	__esModule: true,
	default: 'CustomTab',
}));
jest.mock('./useStyles', () => ({
	useStyles: () => ({
		container: { bottom: 0, left: 0, right: 0 },
		tabsRow: { paddingBottom: 10 },
	}),
}));

const createTabBarProps = (tabBarVisibility?: 'visible' | 'hidden'): BottomTabBarProps =>
	({
		descriptors: {
			'pokedex-key': {
				options: {
					title: 'Pokédex',
					tabBarIcon: jest.fn(() => null),
					...(tabBarVisibility ? { tabBarVisibility } : {}),
				},
			},
		},
		insets: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
		navigation: {
			emit: jest.fn(() => ({ defaultPrevented: false })),
			navigate: jest.fn(),
		},
		state: {
			index: 0,
			routes: [{ key: 'pokedex-key', name: 'pokedex' }],
		},
	}) as BottomTabBarProps;

describe('Tabs', () => {
	it('defaults to visible when the focused route does not define tabBarVisibility', () => {
		const { UNSAFE_getByProps: unsafeGetByProps } = render(<Tabs {...createTabBarProps()} />);

		const tabBar = unsafeGetByProps({ testID: 'custom-tab-bar' });

		expect(tabBar.props.pointerEvents).toBe('box-none');
		expect(tabBar.props.animate).toEqual({
			opacity: 1,
			translateY: 0,
		});
	});

	it('hides the tab bar when the focused route sets tabBarVisibility to hidden', () => {
		const { UNSAFE_getByProps: unsafeGetByProps } = render(
			<Tabs {...createTabBarProps('hidden')} />,
		);

		const tabBar = unsafeGetByProps({ testID: 'custom-tab-bar' });

		expect(tabBar.props.pointerEvents).toBe('none');
		expect(tabBar.props.animate.opacity).toBe(0);
		expect(tabBar.props.animate.translateY).toBeGreaterThan(0);
	});
});
