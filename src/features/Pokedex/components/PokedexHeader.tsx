import FilterIcon from '@assets/icons/filter.svg';
import GenerationIcon from '@assets/icons/generation.svg';
import SearchIcon from '@assets/icons/search.svg';
import SortIcon from '@assets/icons/sort.svg';
import { customColor, textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
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
				paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding,
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
						width={sharedStyles.dimensions.iconsSize}
						height={sharedStyles.dimensions.iconsSize}
					/>
					<TextInput
						testID='pokedex-search-input'
						value={searchValue}
						onChangeText={onSearchChange}
						placeholder={texts.pokedex.searchPlaceholder}
						placeholderTextColor={textColor.grey}
						className='ml-2 flex-1 text-[13px] pt-0 pb-0'
						textAlignVertical='center'
						style={{ color: textColor.black, fontFamily: sharedStyles.typography.primaryFont }}
					/>
					{shouldShowClearSearchButton(searchValue) && (
						<TouchableOpacity
							testID='pokedex-clear-search-button'
							accessibilityRole='button'
							accessibilityLabel={texts.pokedex.clearSearchButtonA11y}
							activeOpacity={sharedStyles.opacity.active}
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
						activeOpacity={sharedStyles.opacity.active}
						onPress={onPress}
						className='h-8 w-8 items-center justify-center rounded-xl border border-[#E6E6E6]'
						style={{
							backgroundColor: customColor.input,
							opacity: disabled ? sharedStyles.pokedex.sortBadge.disabledOpacity : 1,
						}}
					>
						<Icon
							width={sharedStyles.dimensions.iconsSize}
							height={sharedStyles.dimensions.iconsSize}
						/>

						{id === PokedexHeaderActionId.Sort && hasActiveSort && (
							<View
								testID='pokedex-sort-badge'
								className='absolute -top-1 -right-1 items-center justify-center rounded-full'
								style={{
									width: sharedStyles.pokedex.sortBadge.size,
									height: sharedStyles.pokedex.sortBadge.size,
									backgroundColor: typeColors.fighting,
								}}
							>
								<Text
									testID='pokedex-sort-badge-label'
									className='text-center'
									style={{
										fontFamily: sharedStyles.typography.primaryFont,
										color: textColor.primary,
										fontSize: sharedStyles.pokedex.sortBadge.fontSize,
										lineHeight: sharedStyles.pokedex.sortBadge.size - 1,
									}}
								>
									{sharedStyles.pokedex.sortBadge.activeText}
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
