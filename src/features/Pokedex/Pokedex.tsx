import FadeInWrapper from '@components/FadeInWrapper';
import PokeCard from '@components/PokeCard';
import ScrollToTop from '@components/ScrollToTop';
import { API_URL } from '@constants/api';
import { textColor, typeColors } from '@constants/colors';
import {
	CARDS_INDEX,
	HEADER_GRADIENT_INDEX,
	HEADER_INDEX,
	PRIMARY_FONT,
	SCREEN_HORIZONTAL_PADDING,
	WALLPAPER_INDEX,
} from '@constants/sharedStyles';
import { usePokemonList } from '@hooks/usePokemonList';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import { useSavedPokemons } from '@store/savedStore';
import texts from '@utils/texts.json';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleProp, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PokedexMode } from '@/src/types';
import { Pokemon } from '@/src/types/pokemonList';

import { PokedexHeader } from './components';
import { shouldShowScrollToTop } from './helpers';

const FILTERS_BAR_HEIGHT = 56;

const Pokedex = () => {
	const { top, bottom } = useSafeAreaInsets();
	const { mode } = useLocalSearchParams<{ mode?: PokedexMode }>();
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
	} = usePokemonList();

	const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const isSavedMode = mode === 'saved';
	const backgroundSource = isSavedMode
		? require('@assets/images/wallpaper-misc.jpg')
		: require('@assets/images/wallpaper-light.jpg');

	const listRef = useRef<FlashListRef<Pokemon>>(null);

	const pokemonList = useMemo(
		() =>
			data?.pages.reduce<Pokemon[]>((accumulator, page) => accumulator.concat(page.results), []) ??
			[],
		[data],
	);

	const savedPokemonList = useMemo(
		() =>
			savedPokemons.map(name => ({
				name,
				url: `${API_URL}/${name}`,
			})),
		[savedPokemons],
	);

	const displayedPokemonList = isSavedMode ? savedPokemonList : pokemonList;

	const contentContainerStyle: StyleProp<ViewStyle> = {
		paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
		paddingTop: top + FILTERS_BAR_HEIGHT,
		paddingBottom: bottom + 80,
	};

	const handleRefresh = () => refetch();

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
		setShowScrollToTopButton(shouldShowScrollToTop(offsetY));
	}, []);

	useEffect(() => {
		if (isError) Alert.alert(texts.alerts.errorFetchingPokemonTitle, error.message);
	}, [isError, error]);

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
						searchValue={searchValue}
						onSearchChange={setSearchValue}
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
						if (hasNextPage && !isFetchingNextPage) fetchNextPage();
					}}
					keyExtractor={({ name }) => name}
					ListEmptyComponent={
						isSavedMode ? (
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
					ListFooterComponent={isFetchingNextPage && !isSavedMode ? <ActivityIndicator /> : null}
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
