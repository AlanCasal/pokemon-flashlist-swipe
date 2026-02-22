import FadeInWrapper from '@components/FadeInWrapper';
import ScrollToTop from '@components/ScrollToTop';
import WallpaperBackground from '@components/WallpaperBackground';
import { FlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { isIos } from '@/src/utils/helpers';

import FilterBottomSheet from './components/FilterBottomSheet';
import GenerationBottomSheet from './components/GenerationBottomSheet';
import PokedexEdgeGradient from './components/PokedexEdgeGradient';
import PokedexHeader from './components/PokedexHeader';
import PokedexListEmpty from './components/PokedexListEmpty';
import SortBottomSheet from './components/SortBottomSheet';
import { usePokedexScreenController } from './hooks/usePokedexScreenController';
import { useSearchLoadingSpinner } from './hooks/useSearchLoadingSpinner';
import { useStyles } from './styles';
import { type PokedexListEmptyProps } from './types';

// Render farther ahead to reduce blank space during high-velocity flings.
const POKEDEX_FLASHLIST_DRAW_DISTANCE = 1200; // px
const GENERATION_SHEET_BLUR_INTENSITY = 18;

const Pokedex = () => {
	const {
		backgroundSource,
		bottomInset,
		flashListProps,
		filterSheetProps,
		generationSheetProps,
		headerProps,
		isAnyBottomSheetOpen,
		isEmptySavedPokeBallSaved,
		isInitialLoading,
		isSavedMode,
		isSearchActive,
		isSearchingPokemon,
		listRef,
		onEmptySavedPokeBallPress,
		scrollToTopProps,
		shouldDarkenBackgroundForEmptySavedState,
		shouldShowSearchLoadingSpinner,
		shouldShowSearchNotFound,
		sortSheetProps,
		topInset,
	} = usePokedexScreenController();

	const spinnerAnimatedStyle = useSearchLoadingSpinner(shouldShowSearchLoadingSpinner);
	const styles = useStyles({ shouldShowSearchLoadingSpinner });

	const listEmptyProps = useMemo<PokedexListEmptyProps>(
		() => ({
			shouldShowSearchNotFound,
			isSearchActive,
			isSavedMode,
			isSearchingPokemon,
			spinnerAnimatedStyle,
			isEmptySavedPokeBallSaved,
			onEmptySavedPokeBallPress,
		}),
		[
			shouldShowSearchNotFound,
			isSearchActive,
			isSavedMode,
			isSearchingPokemon,
			isEmptySavedPokeBallSaved,
			onEmptySavedPokeBallPress,
			spinnerAnimatedStyle,
		],
	);

	if (isInitialLoading) return <ActivityIndicator size='large' />;

	return (
		<FadeInWrapper duration={250}>
			<View style={styles.container}>
				<WallpaperBackground source={backgroundSource} />

				{shouldDarkenBackgroundForEmptySavedState && (
					<View
						pointerEvents='none'
						style={styles.savedWallpaperOverlay}
					/>
				)}

				<PokedexEdgeGradient position='top' />

				{isIos && isAnyBottomSheetOpen && (
					<BlurView
						intensity={GENERATION_SHEET_BLUR_INTENSITY}
						tint='dark'
						pointerEvents='none'
						style={styles.blurOverlay}
					/>
				)}

				<PokedexEdgeGradient position='bottom' />

				<View style={styles.headerContainer}>
					<PokedexHeader {...headerProps} />
				</View>

				<FlashList
					ref={listRef}
					data={flashListProps.data}
					renderItem={flashListProps.renderItem}
					drawDistance={POKEDEX_FLASHLIST_DRAW_DISTANCE}
					onEndReachedThreshold={1}
					contentContainerStyle={styles.contentContainer}
					style={styles.flashList}
					maintainVisibleContentPosition={{ disabled: true }}
					alwaysBounceVertical
					refreshing={flashListProps.refreshing}
					onRefresh={flashListProps.onRefresh}
					progressViewOffset={topInset}
					onScroll={flashListProps.onScroll}
					scrollEventThrottle={16}
					onEndReached={flashListProps.onEndReached}
					keyExtractor={({ name }) => name}
					ListEmptyComponent={<PokedexListEmpty {...listEmptyProps} />}
					ListFooterComponent={flashListProps.listFooterComponent}
				/>

				<ScrollToTop
					visible={scrollToTopProps.visible}
					onPress={scrollToTopProps.onPress}
					bottomInset={bottomInset}
				/>

				{isSavedMode && <SortBottomSheet {...sortSheetProps} />}

				<GenerationBottomSheet {...generationSheetProps} />
				<FilterBottomSheet {...filterSheetProps} />
			</View>
		</FadeInWrapper>
	);
};

export default Pokedex;
