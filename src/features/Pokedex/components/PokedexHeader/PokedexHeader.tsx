import FilterIcon from '@assets/icons/filter.svg';
import GenerationIcon from '@assets/icons/generation.svg';
import SearchIcon from '@assets/icons/search.svg';
import SortIcon from '@assets/icons/sort.svg';
import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import texts from '@utils/texts.json';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { shouldShowClearSearchButton } from '../../helpers';
import { type HeaderAction, PokedexHeaderActionId, type PokedexHeaderProps } from '../../types';
import PokedexActionBadge from '../PokedexActionBadge';
import { getActionBadgeTestIds } from './helpers';
import styles, { createActionStyles, useStyles } from './styles';

const PokedexHeader = ({
	onGenerationPress,
	onSortPress,
	onFilterPress,
	onClearSearch,
	onSearchChange,
	searchValue,
	topInset,
	hasActiveGeneration,
	hasActiveSort,
	isSortEnabled,
}: PokedexHeaderProps) => {
	const containerStyles = useStyles({ topInset });

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
			style={containerStyles.container}
		>
			<View
				testID='pokedex-header-controls'
				style={styles.controls}
			>
				<View style={styles.searchInputContainer}>
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
						textAlignVertical='center'
						style={styles.searchInput}
					/>
					{shouldShowClearSearchButton(searchValue) && (
						<TouchableOpacity
							testID='pokedex-clear-search-button'
							accessibilityRole='button'
							accessibilityLabel={texts.pokedex.clearSearchButtonA11y}
							activeOpacity={sharedStyles.opacity.active}
							onPress={onClearSearch}
							style={styles.clearSearchButton}
						>
							<MaterialCommunityIcons
								name='close-circle'
								size={16}
								color={textColor.grey}
							/>
						</TouchableOpacity>
					)}
				</View>

				{actions.map(({ id, Icon, accessibilityLabel, onPress, testID, disabled }) => {
					const actionStyles = createActionStyles({ disabled });
					const badgeTestIds = getActionBadgeTestIds({
						id,
						hasActiveGeneration,
						hasActiveSort,
					});

					return (
						<TouchableOpacity
							key={id}
							testID={testID}
							accessibilityRole='button'
							accessibilityLabel={accessibilityLabel}
							disabled={disabled}
							activeOpacity={sharedStyles.opacity.active}
							onPress={onPress}
							style={[styles.actionButton, actionStyles.actionButtonState]}
						>
							<Icon
								width={sharedStyles.dimensions.iconsSize}
								height={sharedStyles.dimensions.iconsSize}
							/>

							{badgeTestIds && (
								<PokedexActionBadge
									containerTestID={badgeTestIds.containerTestID}
									labelTestID={badgeTestIds.labelTestID}
								/>
							)}
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

export default PokedexHeader;
