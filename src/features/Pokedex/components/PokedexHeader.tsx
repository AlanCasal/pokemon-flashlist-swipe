import FilterIcon from '@assets/icons/filter.svg';
import GenerationIcon from '@assets/icons/generation.svg';
import SearchIcon from '@assets/icons/search.svg';
import SortIcon from '@assets/icons/sort.svg';
import { customColor, textColor } from '@constants/colors';
import {
	ACTIVE_OPACITY,
	ICONS_SIZE,
	PRIMARY_FONT,
	SCREEN_HORIZONTAL_PADDING,
} from '@constants/sharedStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import texts from '@utils/texts.json';
import { ComponentType } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { shouldShowClearSearchButton } from './helpers';

interface HeaderAction {
	accessibilityLabel: string;
	Icon: ComponentType<SvgProps>;
	id: 'generation' | 'sort' | 'filter';
	onPress: () => void;
	testID: string;
}

export interface PokedexHeaderProps {
	onFilterPress: () => void;
	onGenerationPress: () => void;
	onClearSearch: () => void;
	onSearchChange: (value: string) => void;
	onSortPress: () => void;
	searchValue: string;
	topInset: number;
}

const PokedexHeader = ({
	onGenerationPress,
	onSortPress,
	onFilterPress,
	onClearSearch,
	onSearchChange,
	searchValue,
	topInset,
}: PokedexHeaderProps) => {
	const actions: HeaderAction[] = [
		{
			id: 'generation',
			Icon: GenerationIcon,
			onPress: onGenerationPress,
			accessibilityLabel: texts.pokedex.generationButtonA11y,
			testID: 'pokedex-generation-button',
		},
		{
			id: 'sort',
			Icon: SortIcon,
			onPress: onSortPress,
			accessibilityLabel: texts.pokedex.sortButtonA11y,
			testID: 'pokedex-sort-button',
		},
		{
			id: 'filter',
			Icon: FilterIcon,
			onPress: onFilterPress,
			accessibilityLabel: texts.pokedex.filterButtonA11y,
			testID: 'pokedex-filter-button',
		},
	];

	return (
		<View
			testID='pokedex-header'
			className='pb-3'
			style={{
				paddingTop: topInset,
				paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
			}}
		>
			<View
				testID='pokedex-header-controls'
				className='flex-row items-center gap-2'
			>
				<View
					className='h-9 flex-1 flex-row items-center rounded-xl border border-[#E6E6E6] px-3'
					style={{
						backgroundColor: customColor.input,
					}}
				>
					<SearchIcon
						width={ICONS_SIZE}
						height={ICONS_SIZE}
					/>
					<TextInput
						testID='pokedex-search-input'
						value={searchValue}
						onChangeText={onSearchChange}
						placeholder={texts.pokedex.searchPlaceholder}
						placeholderTextColor={textColor.grey}
						className='ml-2 flex-1 text-[13px]'
						style={{ color: textColor.black, fontFamily: PRIMARY_FONT }}
					/>
					{shouldShowClearSearchButton(searchValue) && (
						<TouchableOpacity
							testID='pokedex-clear-search-button'
							accessibilityRole='button'
							accessibilityLabel={texts.pokedex.clearSearchButtonA11y}
							activeOpacity={ACTIVE_OPACITY}
							onPress={onClearSearch}
							className='ml-2'
						>
							<MaterialCommunityIcons
								name='close-circle'
								size={16}
								color={textColor.grey}
							/>
						</TouchableOpacity>
					)}
				</View>

				{actions.map(({ id, Icon, accessibilityLabel, onPress, testID }) => (
					<TouchableOpacity
						key={id}
						testID={testID}
						accessibilityRole='button'
						accessibilityLabel={accessibilityLabel}
						activeOpacity={ACTIVE_OPACITY}
						onPress={onPress}
						className='h-8 w-8 items-center justify-center rounded-xl border border-[#E6E6E6]'
						style={{
							backgroundColor: customColor.input,
						}}
					>
						<Icon
							width={ICONS_SIZE}
							height={ICONS_SIZE}
						/>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default PokedexHeader;
