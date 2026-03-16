import ScrollToTop from '@components/ScrollToTop';
import WallpaperBackground from '@components/WallpaperBackground';
import { FlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { useMemo } from 'react';
import { View } from 'react-native';

import Menu from '@/src/components/Menu';
import { isIos } from '@/src/utils/helpers';

import FilterBottomSheet from './components/FilterBottomSheet';
import GenerationBottomSheet from './components/GenerationBottomSheet';
import PokedexEdgeGradient from './components/PokedexEdgeGradient';
import PokedexHeader from './components/PokedexHeader';
import PokedexListEmpty from './components/PokedexListEmpty';
import SortBottomSheet from './components/SortBottomSheet';
import { usePokedexScreenController } from './hooks/usePokedexScreenController';
import { type PokedexListEmptyProps } from './types';
import { useStyles } from './useStyles';

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
		isSavedMode,
		listRef,
		onEmptySavedPokeBallPress,
		scrollToTopProps,
		shouldDarkenBackgroundForEmptySavedState,
		shouldShowFilteredEmptyState,
		shouldShowLoadingFeedback,
		shouldShowSearchNotFound,
		sortSheetProps,
		topInset,
	} = usePokedexScreenController();

	const styles = useStyles({ shouldShowLoadingFeedback });

	const listEmptyProps = useMemo<PokedexListEmptyProps>(
		() => ({
			shouldShowSearchNotFound,
			shouldShowFilteredEmptyState,
			isSavedMode,
			shouldShowLoadingFeedback,
			isEmptySavedPokeBallSaved,
			onEmptySavedPokeBallPress,
		}),
		[
			shouldShowSearchNotFound,
			shouldShowFilteredEmptyState,
			isSavedMode,
			shouldShowLoadingFeedback,
			isEmptySavedPokeBallSaved,
			onEmptySavedPokeBallPress,
		],
	);

	return (
		<View style={styles.container}>
			{!shouldShowLoadingFeedback && <WallpaperBackground source={backgroundSource} />}

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

			{!isSavedMode && <Menu />}

			{isSavedMode && <SortBottomSheet {...sortSheetProps} />}

			<GenerationBottomSheet {...generationSheetProps} />
			<FilterBottomSheet {...filterSheetProps} />
		</View>
	);
};

export default Pokedex;
