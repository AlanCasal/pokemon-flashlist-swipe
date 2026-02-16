import FadeInWrapper from '@components/FadeInWrapper';
import PokeCard from '@components/PokeCard';
import ScrollToTop from '@components/ScrollToTop';
import WallpaperBackground from '@components/WallpaperBackground';
import { API_URL, SEARCH_DEBOUNCE_MS } from '@constants/api';
import { sharedStyles } from '@constants/sharedStyles';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { usePokemonList } from '@hooks/usePokemonList';
import { normalizeSearchTerm, useSearchPokemon } from '@hooks/useSearchPokemon';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import { useSavedPokemons } from '@store/savedStore';
import texts from '@utils/texts.json';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useSegments } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleProp, View, ViewStyle } from 'react-native';
import {
	cancelAnimation,
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type PokedexMode, type PokedexSortOption } from '@/src/types';
import { Pokemon } from '@/src/types/pokemonList';
import { isIos } from '@/src/utils/helpers';

import PokedexEdgeGradient from './components/PokedexEdgeGradient';
import PokedexHeader from './components/PokedexHeader';
import PokedexListEmpty from './components/PokedexListEmpty';
import SortBottomSheet from './components/SortBottomSheet';
import {
	getFilteredSavedPokemonList,
	getIsSearchNotFoundError,
	getSearchedPokemonList,
	getShouldShowSearchNotFound,
	getSortedPokemonList,
	normalizeSavedPokemonName,
	shouldShowScrollToTop,
} from './helpers';
import {
	PokedexFlashListScrollEvent,
	type PokedexListEmptyProps,
	PokedexRenderItemParams,
} from './types';

const Pokedex = () => {
	const { top, bottom } = useSafeAreaInsets();
	const { mode } = useLocalSearchParams<{ mode?: PokedexMode }>();
	const segments = useSegments();
	const activeTab = segments[segments.length - 1];
	const isSavedMode = mode === 'saved';
	const isCurrentScreen = activeTab === (isSavedMode ? 'saved' : 'pokedex');
	const savedPokemons = useSavedPokemons();
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isFetchingNextPage,
		isError,
		error,
		isRefetching,
		refetch,
	} = usePokemonList(!isSavedMode && isCurrentScreen);

	const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
	const [allSearchValue, setAllSearchValue] = useState('');
	const [savedSearchValue, setSavedSearchValue] = useState('');
	const [isEmptySavedPokeBallSaved, setIsEmptySavedPokeBallSaved] = useState(false);
	const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
	const [savedSortOption, setSavedSortOption] = useState<PokedexSortOption | null>(null);

	const debouncedAllSearchValue = useDebouncedValue(allSearchValue, SEARCH_DEBOUNCE_MS);
	const debouncedSavedSearchValue = useDebouncedValue(savedSearchValue, SEARCH_DEBOUNCE_MS);
	const activeSearchValue = isSavedMode ? savedSearchValue : allSearchValue;
	const activeDebouncedSearchValue = isSavedMode
		? debouncedSavedSearchValue
		: debouncedAllSearchValue;
	const normalizedActiveSearchValue = normalizeSearchTerm(activeDebouncedSearchValue);
	const isSearchActive = normalizedActiveSearchValue.length > 0;
	const backgroundSource = isSavedMode
		? require('@assets/images/wallpaper-misc.jpg')
		: require('@assets/images/wallpaper-light.jpg');

	const listRef = useRef<FlashListRef<Pokemon>>(null);
	const listScrollOffsetRef = useRef(0);
	const {
		data: searchedPokemon,
		isLoading: isSearchingPokemon,
		isError: isSearchError,
		error: searchError,
		refetch: refetchSearch,
	} = useSearchPokemon(
		activeDebouncedSearchValue,
		!isSavedMode && isSearchActive && isCurrentScreen,
	);

	const isSearchNotFoundError = getIsSearchNotFoundError(searchError);

	const pokemonList = useMemo(
		() =>
			data?.pages.reduce<Pokemon[]>((accumulator, page) => accumulator.concat(page.results), []) ??
			[],
		[data],
	);

	const savedPokemonList = useMemo(
		() =>
			Array.from(new Set(savedPokemons.map(normalizeSavedPokemonName)))
				.filter(Boolean)
				.map(name => ({
					name,
					url: `${API_URL}/${name}`,
				})),
		[savedPokemons],
	);

	const searchedPokemonList = useMemo(
		() => getSearchedPokemonList(searchedPokemon),
		[searchedPokemon],
	);

	const filteredSavedPokemonList = useMemo(() => {
		if (!isSavedMode || !isSearchActive) return savedPokemonList;

		return getFilteredSavedPokemonList(savedPokemonList, normalizedActiveSearchValue);
	}, [isSavedMode, isSearchActive, savedPokemonList, normalizedActiveSearchValue]);

	const displayedPokemonList = useMemo(() => {
		if (!isSearchActive) return isSavedMode ? savedPokemonList : pokemonList;
		if (isSavedMode) return filteredSavedPokemonList;

		return searchedPokemonList;
	}, [
		isSearchActive,
		isSavedMode,
		savedPokemonList,
		pokemonList,
		filteredSavedPokemonList,
		searchedPokemonList,
	]);

	const sortedPokemonList = useMemo(
		() =>
			isSavedMode
				? getSortedPokemonList(displayedPokemonList, savedSortOption)
				: displayedPokemonList,
		[displayedPokemonList, isSavedMode, savedSortOption],
	);

	const shouldShowSearchNotFound = getShouldShowSearchNotFound({
		isSearchActive,
		displayedPokemonCount: displayedPokemonList.length,
		isSavedMode,
		isSearchingPokemon,
		isSearchError,
		isSearchNotFoundError,
	});

	const shouldShowSearchLoadingSpinner =
		isSearchActive && !isSavedMode && isSearchingPokemon && displayedPokemonList.length === 0;
	const shouldDarkenBackgroundForEmptySavedState =
		isSavedMode && !isSearchActive && savedPokemonList.length === 0;
	const spinnerRotation = useSharedValue(0);
	const spinnerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${spinnerRotation.value}deg` }],
	}));

	const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
		() => ({
			paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding,
			paddingTop: shouldShowSearchLoadingSpinner ? 0 : top + sharedStyles.pokedex.filtersBarHeight,
			paddingBottom: bottom + 80,
			flexGrow: shouldShowSearchLoadingSpinner ? 1 : undefined,
			justifyContent: shouldShowSearchLoadingSpinner ? 'center' : undefined,
		}),
		[bottom, shouldShowSearchLoadingSpinner, top],
	);

	useEffect(() => {
		if (!shouldShowSearchLoadingSpinner) {
			cancelAnimation(spinnerRotation);
			spinnerRotation.value = 0;
			return;
		}

		spinnerRotation.value = 0;
		spinnerRotation.value = withRepeat(
			withTiming(360, {
				duration: sharedStyles.pokedex.searchLoadingSpinner.rotationDurationMs,
				easing: Easing.linear,
			}),
			-1,
			false,
		);

		return () => {
			cancelAnimation(spinnerRotation);
		};
	}, [shouldShowSearchLoadingSpinner, spinnerRotation]);

	const handleRefresh = () => {
		if (!isSavedMode && isSearchActive) {
			void refetchSearch();
			return;
		}

		void refetch();
	};

	const handleRenderItem = useCallback(
		({ item }: PokedexRenderItemParams) => (
			<PokeCard
				url={item.url}
				isSavedMode={isSavedMode}
			/>
		),
		[isSavedMode],
	);

	const handleScrollToTop = () => {
		listRef.current?.scrollToOffset({ offset: 0, animated: true });
	};

	const handleNoopPress = useCallback(() => undefined, []);
	const handleEmptySavedPokeBallPress = useCallback(() => {
		setIsEmptySavedPokeBallSaved(previousValue => !previousValue);
	}, []);
	const handleSortPress = useCallback(() => {
		if (!isSavedMode) return;
		setIsSortSheetOpen(true);
	}, [isSavedMode]);

	const handleCloseSortSheet = useCallback(() => {
		setIsSortSheetOpen(false);
	}, []);

	const handleSortOptionPress = useCallback((option: PokedexSortOption) => {
		setSavedSortOption(previousSortOption => (previousSortOption === option ? null : option));
	}, []);

	const handleListScroll = useCallback((offsetY: number) => {
		listScrollOffsetRef.current = offsetY;
		setShowScrollToTopButton(shouldShowScrollToTop(offsetY));
	}, []);

	const handleFlashListScroll = useCallback(
		({ nativeEvent }: PokedexFlashListScrollEvent) => {
			handleListScroll(nativeEvent.contentOffset.y);
		},
		[handleListScroll],
	);

	const handleEndReached = useCallback(() => {
		if (isSavedMode) return;
		if (isSearchActive) return;
		if (hasNextPage && !isFetchingNextPage) fetchNextPage();
	}, [fetchNextPage, hasNextPage, isFetchingNextPage, isSavedMode, isSearchActive]);

	const handleSearchChange = useCallback(
		(value: string) => {
			if (isSavedMode) {
				setSavedSearchValue(value);
				return;
			}

			setAllSearchValue(value);
		},
		[isSavedMode],
	);

	const handleClearSearch = useCallback(() => {
		if (isSavedMode) {
			setSavedSearchValue('');
			return;
		}

		setAllSearchValue('');
	}, [isSavedMode]);

	useEffect(() => {
		if (!isCurrentScreen) return;
		listRef.current?.scrollToOffset({ offset: 0, animated: false });
		listScrollOffsetRef.current = 0;
		const frameId = requestAnimationFrame(() => {
			setShowScrollToTopButton(false);
		});

		return () => {
			cancelAnimationFrame(frameId);
		};
	}, [isCurrentScreen, isSavedMode, normalizedActiveSearchValue]);

	useEffect(() => {
		if (!isCurrentScreen || isSavedMode) return;
		if (isError) Alert.alert(texts.alerts.errorFetchingPokemonTitle, error.message);
	}, [isCurrentScreen, isSavedMode, isError, error]);

	useEffect(() => {
		if (
			isCurrentScreen &&
			!isSavedMode &&
			isSearchActive &&
			isSearchError &&
			!isSearchNotFoundError &&
			searchError
		) {
			Alert.alert(texts.alerts.errorFetchingPokemonTitle, searchError.message);
		}
	}, [
		isCurrentScreen,
		isSavedMode,
		isSearchActive,
		isSearchError,
		isSearchNotFoundError,
		searchError,
	]);

	const listEmptyProps = useMemo<PokedexListEmptyProps>(
		() => ({
			shouldShowSearchNotFound,
			isSearchActive,
			isSavedMode,
			isSearchingPokemon,
			spinnerAnimatedStyle,
			isEmptySavedPokeBallSaved,
			onEmptySavedPokeBallPress: handleEmptySavedPokeBallPress,
		}),
		[
			handleEmptySavedPokeBallPress,
			isEmptySavedPokeBallSaved,
			isSavedMode,
			isSearchActive,
			isSearchingPokemon,
			shouldShowSearchNotFound,
			spinnerAnimatedStyle,
		],
	);

	if (isLoading && !data) return <ActivityIndicator size='large' />;

	return (
		<FadeInWrapper duration={250}>
			<View className='flex-1'>
				<WallpaperBackground source={backgroundSource} />

				{shouldDarkenBackgroundForEmptySavedState && (
					<View
						pointerEvents='none'
						style={{
							position: 'absolute',
							inset: 0,
							backgroundColor: 'rgba(0, 0, 0, 0.2)',
							zIndex: sharedStyles.zIndex.wallpaper + 1,
						}}
					/>
				)}

				<PokedexEdgeGradient position='top' />

				{isIos && isSortSheetOpen && (
					<BlurView
						intensity={sharedStyles.pokedex.sortSheet.blurIntensity}
						tint='dark'
						pointerEvents='none'
						style={{ position: 'absolute', inset: 0, zIndex: sharedStyles.zIndex.header + 1 }}
					/>
				)}

				<PokedexEdgeGradient position='bottom' />

				<View
					className='absolute top-0 right-0 left-0'
					style={{ zIndex: sharedStyles.zIndex.header }}
				>
					<PokedexHeader
						topInset={top}
						searchValue={activeSearchValue}
						hasActiveSort={isSavedMode && Boolean(savedSortOption)}
						isSortEnabled={isSavedMode}
						onSearchChange={handleSearchChange}
						onClearSearch={handleClearSearch}
						onGenerationPress={handleNoopPress}
						onSortPress={handleSortPress}
						onFilterPress={handleNoopPress}
					/>
				</View>

				<FlashList
					ref={listRef}
					data={sortedPokemonList}
					renderItem={handleRenderItem}
					onEndReachedThreshold={1}
					contentContainerStyle={contentContainerStyle}
					style={{ flex: 1, zIndex: sharedStyles.zIndex.cards }}
					maintainVisibleContentPosition={{ disabled: true }}
					alwaysBounceVertical
					refreshing={isRefetching}
					onRefresh={handleRefresh}
					progressViewOffset={top}
					onScroll={handleFlashListScroll}
					scrollEventThrottle={16}
					onEndReached={handleEndReached}
					keyExtractor={({ name }) => name}
					ListEmptyComponent={<PokedexListEmpty {...listEmptyProps} />}
					ListFooterComponent={
						isFetchingNextPage && !isSavedMode && !isSearchActive ? <ActivityIndicator /> : null
					}
				/>

				<ScrollToTop
					visible={showScrollToTopButton}
					onPress={handleScrollToTop}
					bottomInset={bottom}
				/>

				{isSavedMode && (
					<SortBottomSheet
						isOpen={isSavedMode && isSortSheetOpen}
						selectedOption={savedSortOption}
						onClose={handleCloseSortSheet}
						onOptionPress={handleSortOptionPress}
					/>
				)}
			</View>
		</FadeInWrapper>
	);
};

export default Pokedex;
