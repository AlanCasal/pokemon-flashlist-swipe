// @ts-nocheck
import { fireEvent, render } from '@testing-library/react-native';

import Menu from './Menu';

const mockUseLanguagePreference = jest.fn();
const mockUseResolvedLanguage = jest.fn();
const mockUseSetLanguagePreference = jest.fn();
const mockSetLanguagePreference = jest.fn();

jest.mock('@/src/store/languageStore', () => ({
	useLanguagePreference: () => mockUseLanguagePreference(),
	useResolvedLanguage: () => mockUseResolvedLanguage(),
	useSetLanguagePreference: () => mockUseSetLanguagePreference(),
}));

jest.mock('@components/common/BottomSheetGradientHandle', () => ({
	__esModule: true,
	default: () => null,
}));

jest.mock('@expo/vector-icons', () => ({
	MaterialCommunityIcons: () => null,
}));

jest.mock('@gorhom/bottom-sheet', () => {
	const React = jest.requireActual('react');
	const { View } = jest.requireActual('react-native');

	class MockBottomSheetModal extends React.Component {
		state = {
			isVisible: false,
		};

		dismiss = () => {
			this.setState({ isVisible: false });
			this.props.onChange?.(-1);
			this.props.onDismiss?.();
		};

		present = () => {
			this.setState({ isVisible: true });
			this.props.onChange?.(0);
		};

		render() {
			if (!this.state.isVisible) return null;

			return React.createElement(View, null, this.props.children);
		}
	}

	return {
		BottomSheetBackdrop: ({ children }) => React.createElement(React.Fragment, null, children),
		BottomSheetModal: MockBottomSheetModal,
		BottomSheetView: ({ children, ...props }) => React.createElement(View, props, children),
	};
});

describe('Menu', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseLanguagePreference.mockReturnValue('system');
		mockUseResolvedLanguage.mockReturnValue('en');
		mockUseSetLanguagePreference.mockReturnValue(mockSetLanguagePreference);
	});

	it('opens with the root menu row only', () => {
		const { getByTestId, getByText, queryByTestId, queryByText } = render(<Menu />);

		fireEvent.press(getByTestId('language-switcher-fab'));

		expect(getByText('Menu')).toBeTruthy();
		expect(getByTestId('language-switcher-menu-languages')).toBeTruthy();
		expect(getByText('Languages')).toBeTruthy();
		expect(queryByTestId('language-switcher-back-button')).toBeNull();
		expect(queryByTestId('language-switcher-close-button')).toBeTruthy();
		expect(queryByTestId('language-switcher-option-en')).toBeNull();
		expect(queryByText('Back')).toBeNull();
	});

	it('navigates into and out of the languages submenu inside the sheet', () => {
		const { getByTestId, queryByTestId } = render(<Menu />);

		fireEvent.press(getByTestId('language-switcher-fab'));
		fireEvent.press(getByTestId('language-switcher-menu-languages'));

		expect(getByTestId('language-switcher-back-button')).toBeTruthy();
		expect(getByTestId('language-switcher-close-button')).toBeTruthy();
		expect(getByTestId('language-switcher-option-en')).toBeTruthy();
		expect(getByTestId('language-switcher-option-es')).toBeTruthy();

		fireEvent.press(getByTestId('language-switcher-back-button'));

		expect(getByTestId('language-switcher-menu-languages')).toBeTruthy();
		expect(queryByTestId('language-switcher-option-en')).toBeNull();
	});

	it('selects a language and dismisses the sheet', () => {
		const { getByTestId, queryByTestId } = render(<Menu />);

		fireEvent.press(getByTestId('language-switcher-fab'));
		fireEvent.press(getByTestId('language-switcher-menu-languages'));
		fireEvent.press(getByTestId('language-switcher-option-es'));

		expect(mockSetLanguagePreference).toHaveBeenCalledWith('es');
		expect(queryByTestId('language-switcher-menu-languages')).toBeNull();
	});

	it('resets to the root menu after dismissing and reopening the sheet', () => {
		const { getByTestId, queryByTestId } = render(<Menu />);

		fireEvent.press(getByTestId('language-switcher-fab'));
		fireEvent.press(getByTestId('language-switcher-menu-languages'));
		fireEvent.press(getByTestId('language-switcher-close-button'));

		expect(queryByTestId('language-switcher-menu-languages')).toBeNull();

		fireEvent.press(getByTestId('language-switcher-fab'));

		expect(getByTestId('language-switcher-menu-languages')).toBeTruthy();
		expect(queryByTestId('language-switcher-option-en')).toBeNull();
		expect(queryByTestId('language-switcher-back-button')).toBeNull();
		expect(getByTestId('language-switcher-close-button')).toBeTruthy();
	});
});
