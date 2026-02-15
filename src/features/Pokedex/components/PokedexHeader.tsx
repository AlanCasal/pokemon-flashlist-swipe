import FilterIcon from '@assets/icons/filter.svg';
import GenerationIcon from '@assets/icons/generation.svg';
import SearchIcon from '@assets/icons/search.svg';
import SortIcon from '@assets/icons/sort.svg';
import { customColor, textColor, typeColors } from '@constants/colors';
import {
	SORT_ACTIVE_BADGE_TEXT,
	SORT_BADGE_FONT_SIZE,
	SORT_BADGE_SIZE,
	SORT_DISABLED_OPACITY,
} from '@constants/pokedex';
import {
	ACTIVE_OPACITY,
	ICONS_SIZE,
	PRIMARY_FONT,
	SCREEN_HORIZONTAL_PADDING,
} from '@constants/sharedStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import texts from '@utils/texts.json';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { shouldShowClearSearchButton } from './helpers';
import { type HeaderAction, PokedexHeaderActionId, type PokedexHeaderProps } from './types';

const PokedexHeader = ({
	onGenerationPress,
	onSortPress,
	onFilterPress,
	onClearSearch,
	onSearchChange,
	searchValue,
	topInset,
	hasActiveSort,
	isSortEnabled,
}: PokedexHeaderProps) => {
	const actions: HeaderAction[] = [
		{
			id: PokedexHeaderActionId.Generation,
			Icon: GenerationIcon,
			onPress: onGenerationPress,
			accessibilityLabel: texts.pokedex.generationButtonA11y,
			testID: 'pokedex-generation-button',
		},
		{
			id: PokedexHeaderActionId.Sort,
			Icon: SortIcon,
			onPress: onSortPress,
			accessibilityLabel: texts.pokedex.sortButtonA11y,
			testID: 'pokedex-sort-button',
			disabled: !isSortEnabled,
		},
		{
			id: PokedexHeaderActionId.Filter,
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
						className='ml-2 flex-1 text-[13px] pt-0 pb-0'
						textAlignVertical='center'
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

				{actions.map(({ id, Icon, accessibilityLabel, onPress, testID, disabled }) => (
					<TouchableOpacity
						key={id}
						testID={testID}
						accessibilityRole='button'
						accessibilityLabel={accessibilityLabel}
						disabled={disabled}
						activeOpacity={ACTIVE_OPACITY}
						onPress={onPress}
						className='h-8 w-8 items-center justify-center rounded-xl border border-[#E6E6E6]'
						style={{
							backgroundColor: customColor.input,
							opacity: disabled ? SORT_DISABLED_OPACITY : 1,
						}}
					>
						<Icon
							width={ICONS_SIZE}
							height={ICONS_SIZE}
						/>

						{id === PokedexHeaderActionId.Sort && hasActiveSort && (
							<View
								testID='pokedex-sort-badge'
								className='absolute -top-1 -right-1 items-center justify-center rounded-full'
								style={{
									width: SORT_BADGE_SIZE,
									height: SORT_BADGE_SIZE,
									backgroundColor: typeColors.fighting,
								}}
							>
								<Text
									testID='pokedex-sort-badge-label'
									className='text-center'
									style={{
										fontFamily: PRIMARY_FONT,
										color: textColor.primary,
										fontSize: SORT_BADGE_FONT_SIZE,
										lineHeight: SORT_BADGE_SIZE - 1,
									}}
								>
									{SORT_ACTIVE_BADGE_TEXT}
								</Text>
							</View>
						)}
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default PokedexHeader;
