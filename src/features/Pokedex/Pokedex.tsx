import Spinner from '@assets/animated/spinner.svg';
import FadeInWrapper from '@components/FadeInWrapper';
import PokeBall from '@components/PokeBall';
import PokeCard from '@components/PokeCard';
import ScrollToTop from '@components/ScrollToTop';
import { API_URL, SEARCH_DEBOUNCE_MS } from '@constants/api';
import { textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { usePokemonList } from '@hooks/usePokemonList';
import { normalizeSearchTerm, useSearchPokemon } from '@hooks/useSearchPokemon';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import { useSavedPokemons } from '@store/savedStore';
import texts from '@utils/texts.json';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleProp, Text, View, ViewStyle } from 'react-native';
import Animated, {
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

import { PokedexHeader, SortBottomSheet } from './components';
import {
	getFilteredSavedPokemonList,
	getIsSearchNotFoundError,
	getSearchedPokemonList,
	getShouldShowSearchNotFound,
	getSortedPokemonList,
	normalizeSavedPokemonName,
	shouldShowScrollToTop,
} from './helpers';

const EMPTY_SAVED_TEXT_ICON_PLACEHOLDER = '[pokeballIcon]';

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
	const [emptySavedTextBeforeIcon = '', emptySavedTextAfterIcon = ''] =
		texts.pokedex.emptySavedText.split(EMPTY_SAVED_TEXT_ICON_PLACEHOLDER);
	const emptySavedTextBeforeIconLines = emptySavedTextBeforeIcon.split('\n');
	const emptySavedTextAfterIconLines = emptySavedTextAfterIcon.split('\n');
	const emptySavedTextTopLines = emptySavedTextBeforeIconLines.slice(0, -1);
	const emptySavedTextIconPrefix =
		emptySavedTextBeforeIconLines[emptySavedTextBeforeIconLines.length - 1] ?? '';
	const [emptySavedTextIconSuffix = '', ...emptySavedTextBottomLines] =
		emptySavedTextAfterIconLines;
	const shouldRenderEmptySavedTextIcon = texts.pokedex.emptySavedText.includes(
		EMPTY_SAVED_TEXT_ICON_PLACEHOLDER,
	);
	const emptySavedTextStyle = {
		fontFamily: sharedStyles.typography.primaryFont,
		color: textColor.grey,
	};
	const spinnerRotation = useSharedValue(0);
	const spinnerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${spinnerRotation.value}deg` }],
	}));

	const contentContainerStyle: StyleProp<ViewStyle> = {
		paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding,
		paddingTop: shouldShowSearchLoadingSpinner ? 0 : top + sharedStyles.pokedex.filtersBarHeight,
		paddingBottom: bottom + 80,
		flexGrow: shouldShowSearchLoadingSpinner ? 1 : undefined,
		justifyContent: shouldShowSearchLoadingSpinner ? 'center' : undefined,
	};

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

	const handleRenderItem = ({ item }: { item: Pokemon }) => (
		<PokeCard
			url={item.url}
			isSavedMode={isSavedMode}
		/>
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

	if (isLoading && !data) return <ActivityIndicator size='large' />;

	return (
		<FadeInWrapper duration={250}>
			<View className='flex-1'>
				<StatusBar
					style='light'
					backgroundColor={typeColors.dragon}
				/>

				<Image
					source={backgroundSource}
					contentFit='cover'
					blurRadius={
						isIos
							? sharedStyles.blurRadius.backgroundImage.ios
							: sharedStyles.blurRadius.backgroundImage.android
					}
					pointerEvents='none'
					style={{
						position: 'absolute',
						inset: 0,
						opacity: 0.1,
						zIndex: sharedStyles.zIndex.wallpaper,
					}}
				/>
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

				<View
					className='absolute top-0 right-0 left-0 h-[190px] w-full'
					pointerEvents='none'
					style={{ zIndex: sharedStyles.zIndex.headerGradient }}
				>
					<LinearGradient
						colors={[`${typeColors.dragon}F2`, `${typeColors.dragon}22`, 'transparent']}
						start={{ x: 0.5, y: 0 }}
						end={{ x: 0.5, y: 1 }}
						style={{ position: 'absolute', inset: 0 }}
					/>
				</View>

				{isIos && isSortSheetOpen && (
					<BlurView
						intensity={sharedStyles.pokedex.sortSheet.blurIntensity}
						tint='dark'
						pointerEvents='none'
						style={{ position: 'absolute', inset: 0, zIndex: sharedStyles.zIndex.header + 1 }}
					/>
				)}

				<View
					className='absolute bottom-0 right-0 left-0 h-[190px] w-full'
					pointerEvents='none'
					style={{ zIndex: sharedStyles.zIndex.headerGradient }}
				>
					<LinearGradient
						colors={['transparent', `${typeColors.dragon}22`, `${typeColors.dragon}F2`]}
						start={{ x: 0.5, y: 0 }}
						end={{ x: 0.5, y: 1 }}
						style={{ position: 'absolute', inset: 0 }}
					/>
				</View>

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
					onScroll={({ nativeEvent }) => {
						handleListScroll(nativeEvent.contentOffset.y);
					}}
					scrollEventThrottle={16}
					onEndReached={() => {
						if (isSavedMode) return;
						if (isSearchActive) return;
						if (hasNextPage && !isFetchingNextPage) fetchNextPage();
					}}
					keyExtractor={({ name }) => name}
					ListEmptyComponent={
						shouldShowSearchNotFound ? (
							<View
								className='mt-16 items-center justify-center'
								style={{ paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding }}
							>
								<Text
									className='text-center text-base'
									style={{
										fontFamily: sharedStyles.typography.primaryFont,
										color: textColor.grey,
									}}
								>
									{texts.pokedex.searchNotFoundText}
								</Text>
							</View>
						) : isSearchActive && !isSavedMode && isSearchingPokemon ? (
							<View className='items-center justify-center'>
								<Animated.View style={spinnerAnimatedStyle}>
									<Spinner
										width={sharedStyles.pokedex.searchLoadingSpinner.size}
										height={sharedStyles.pokedex.searchLoadingSpinner.size}
									/>
								</Animated.View>
							</View>
						) : isSavedMode ? (
							<View
								className='mt-16 items-center justify-center'
								style={{ paddingHorizontal: sharedStyles.spacing.screenHorizontalPadding }}
							>
								{shouldRenderEmptySavedTextIcon ? (
									<>
										{emptySavedTextTopLines.map((line, index) =>
											line ? (
												<Text
													key={`empty-saved-top-${index}`}
													className='text-center text-base'
													style={emptySavedTextStyle}
												>
													{line}
												</Text>
											) : (
												<View
													key={`empty-saved-top-spacer-${index}`}
													className='h-4'
												/>
											),
										)}
										<View className='mt-1 flex-row items-center justify-center'>
											<Text
												className='text-center text-base'
												style={emptySavedTextStyle}
											>
												{emptySavedTextIconPrefix.trimEnd()}
											</Text>
											<PokeBall
												handleOnPress={handleEmptySavedPokeBallPress}
												isSaved={isEmptySavedPokeBallSaved}
												enablePopAnimation
												containerStyles={{ marginHorizontal: 6 }}
											/>
											<Text
												className='text-center text-base'
												style={emptySavedTextStyle}
											>
												{emptySavedTextIconSuffix.trimStart()}
											</Text>
										</View>
										{emptySavedTextBottomLines.map((line, index) =>
											line ? (
												<Text
													key={`empty-saved-bottom-${index}`}
													className='mt-1 text-center text-base'
													style={emptySavedTextStyle}
												>
													{line}
												</Text>
											) : (
												<View
													key={`empty-saved-bottom-spacer-${index}`}
													className='h-4'
												/>
											),
										)}
									</>
								) : (
									<Text
										className='text-center text-base'
										style={emptySavedTextStyle}
									>
										{texts.pokedex.emptySavedText}
									</Text>
								)}
							</View>
						) : null
					}
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
