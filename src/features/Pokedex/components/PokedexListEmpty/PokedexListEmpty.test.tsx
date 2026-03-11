import { render } from '@testing-library/react-native';

import PokedexListEmpty from './PokedexListEmpty';

jest.mock('@hooks/usePrimaryFontFamily', () => ({
	usePrimaryFontFamily: () => 'System',
}));

jest.mock('expo-image', () => {
	const { View } = jest.requireActual('react-native');

	return {
		Image: () => <View testID='loading-image' />,
	};
});

jest.mock('../PokedexEmptySavedState', () => {
	const { View } = jest.requireActual('react-native');

	return {
		__esModule: true,
		default: () => <View testID='empty-saved-state' />,
	};
});

describe('PokedexListEmpty', () => {
	const baseProps = {
		isEmptySavedPokeBallSaved: false,
		isSavedMode: false,
		onEmptySavedPokeBallPress: jest.fn(),
		shouldShowFilteredEmptyState: false,
		shouldShowLoadingFeedback: false,
		shouldShowSearchNotFound: false,
	};

	it('shows search-not-found before filtered empty state', () => {
		const { getByText, queryByText } = render(
			<PokedexListEmpty
				{...baseProps}
				shouldShowFilteredEmptyState
				shouldShowSearchNotFound
			/>,
		);

		expect(getByText("Who's that Pokémon?\nWe couldn't find it!")).toBeTruthy();
		expect(queryByText('No Pokémon found with those filters')).toBeNull();
	});

	it('shows filtered empty text in all mode', () => {
		const { getByText } = render(
			<PokedexListEmpty
				{...baseProps}
				shouldShowFilteredEmptyState
			/>,
		);

		expect(getByText('No Pokémon found with those filters')).toBeTruthy();
	});

	it('shows filtered empty text in saved mode', () => {
		const { getByText, queryByTestId } = render(
			<PokedexListEmpty
				{...baseProps}
				isSavedMode
				shouldShowFilteredEmptyState
			/>,
		);

		expect(getByText('No Pokémon found with those filters')).toBeTruthy();
		expect(queryByTestId('empty-saved-state')).toBeNull();
	});

	it('shows loading feedback in all mode while work is still in flight', () => {
		const { getByTestId, queryByText } = render(
			<PokedexListEmpty
				{...baseProps}
				shouldShowLoadingFeedback
			/>,
		);

		expect(getByTestId('loading-image')).toBeTruthy();
		expect(queryByText('No Pokémon found with those filters')).toBeNull();
	});

	it('does not show saved empty state while loading is still in flight', () => {
		const { queryByTestId } = render(
			<PokedexListEmpty
				{...baseProps}
				isSavedMode
				shouldShowLoadingFeedback
			/>,
		);

		expect(queryByTestId('empty-saved-state')).toBeNull();
	});

	it('shows saved empty state when saved mode is truly empty', () => {
		const { getByTestId } = render(
			<PokedexListEmpty
				{...baseProps}
				isSavedMode
			/>,
		);

		expect(getByTestId('empty-saved-state')).toBeTruthy();
	});
});
