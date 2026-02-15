import FadeInWrapper from '@components/FadeInWrapper';
import PokeCard from '@components/PokeCard';
import ScrollToTop from '@components/ScrollToTop';
import { API_URL, SEARCH_DEBOUNCE_MS } from '@constants/api';
import { textColor, typeColors } from '@constants/colors';
import {
	CARDS_INDEX,
	HEADER_GRADIENT_INDEX,
	HEADER_INDEX,
	PRIMARY_FONT,
	SCREEN_HORIZONTAL_PADDING,
	WALLPAPER_INDEX,
} from '@constants/sharedStyles';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { usePokemonList } from '@hooks/usePokemonList';
import { normalizeSearchTerm, useSearchPokemon } from '@hooks/useSearchPokemon';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import { useSavedPokemons } from '@store/savedStore';
import texts from '@utils/texts.json';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleProp, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PokedexMode } from '@/src/types';
import { Pokemon } from '@/src/types/pokemonList';

import { PokedexHeader } from './components';
import {
	getFilteredSavedPokemonList,
	getIsSearchNotFoundError,
	getSearchedPokemonList,
	getShouldShowSearchNotFound,
	normalizeSavedPokemonName,
	shouldShowScrollToTop,
} from './helpers';

const FILTERS_BAR_HEIGHT = 56;

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

	const shouldShowSearchNotFound = getShouldShowSearchNotFound({
		isSearchActive,
		displayedPokemonCount: displayedPokemonList.length,
		isSavedMode,
		isSearchingPokemon,
		isSearchError,
		isSearchNotFoundError,
	});

	const contentContainerStyle: StyleProp<ViewStyle> = {
		paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
		paddingTop: top + FILTERS_BAR_HEIGHT,
		paddingBottom: bottom + 80,
	};

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
					blurRadius={10}
					pointerEvents='none'
					style={{ position: 'absolute', inset: 0, opacity: 0.1, zIndex: WALLPAPER_INDEX }}
				/>

				<View
					className='absolute top-0 right-0 left-0 h-[190px] w-full'
					pointerEvents='none'
					style={{ zIndex: HEADER_GRADIENT_INDEX }}
				>
					<LinearGradient
						colors={[`${typeColors.dragon}F2`, `${typeColors.dragon}22`, 'transparent']}
						start={{ x: 0.5, y: 0 }}
						end={{ x: 0.5, y: 1 }}
						style={{ position: 'absolute', inset: 0 }}
					/>
				</View>

				<View
					className='absolute top-0 right-0 left-0'
					style={{ zIndex: HEADER_INDEX }}
				>
					<PokedexHeader
						topInset={top}
						searchValue={activeSearchValue}
						onSearchChange={handleSearchChange}
						onClearSearch={handleClearSearch}
						onGenerationPress={handleNoopPress}
						onSortPress={handleNoopPress}
						onFilterPress={handleNoopPress}
					/>
				</View>

				<FlashList
					ref={listRef}
					data={displayedPokemonList}
					renderItem={handleRenderItem}
					onEndReachedThreshold={1}
					contentContainerStyle={contentContainerStyle}
					style={{ flex: 1, zIndex: CARDS_INDEX }}
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
								style={{ paddingHorizontal: SCREEN_HORIZONTAL_PADDING }}
							>
								<Text
									className='text-center text-base'
									style={{
										fontFamily: PRIMARY_FONT,
										color: textColor.grey,
									}}
								>
									{texts.pokedex.searchNotFoundText}
								</Text>
							</View>
						) : isSearchActive && !isSavedMode && isSearchingPokemon ? (
							<ActivityIndicator />
						) : isSavedMode ? (
							<View
								className='mt-16 items-center justify-center'
								style={{ paddingHorizontal: SCREEN_HORIZONTAL_PADDING }}
							>
								<Text
									className='text-center text-base'
									style={{
										fontFamily: PRIMARY_FONT,
										color: textColor.grey,
									}}
								>
									{texts.pokedex.emptySavedText}
								</Text>
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
			</View>
		</FadeInWrapper>
	);
};

export default Pokedex;
