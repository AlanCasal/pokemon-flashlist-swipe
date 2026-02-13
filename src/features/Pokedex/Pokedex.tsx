import {
	ActivityIndicator,
	Alert,
	StyleProp,
	Text,
	View,
	ViewStyle,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pokemon } from '@/src/types/pokemonList';
import PokeCard from '@components/PokeCard';
import ScrollToTop from '@components/ScrollToTop';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { textColor, typeBgColors } from '@constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { usePokemonList } from '@hooks/usePokemonList';
import { useSavedPokemons } from '@store/savedStore';
import { PRIMARY_FONT } from '@constants/sharedStyles';
import { API_URL } from '@constants/api';
import { useLocalSearchParams } from 'expo-router';
import { PokedexMode } from '@/src/types';

const Pokedex = () => {
	const { top, bottom } = useSafeAreaInsets();
	const { mode } = useLocalSearchParams<{ mode?: PokedexMode }>();
	const isSavedMode = mode === 'saved';
	const savedPokemons = useSavedPokemons();
	const listRef = useRef<FlashListRef<Pokemon>>(null);
	const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

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

	const handleRefresh = () => refetch();

	const handleRenderItem = ({ item }: { item: Pokemon }) => (
		<PokeCard url={item.url} />
	);

	useEffect(() => {
		if (isError) Alert.alert('Error fetching Pokemon:', error.message);
	}, [isError, error]);

	const pokemonList = useMemo(
		() =>
			data?.pages.reduce<Pokemon[]>(
				(accumulator, page) => accumulator.concat(page.results),
				[]
			) ?? [],
		[data]
	);

	const savedPokemonList = useMemo(
		() =>
			savedPokemons.map(name => ({
				name,
				url: `${API_URL}/${name}`,
			})),
		[savedPokemons]
	);

	const displayedPokemonList = isSavedMode ? savedPokemonList : pokemonList;

	const contentContainerStyle: StyleProp<ViewStyle> = {
		paddingHorizontal: 40,
		paddingTop: top,
		paddingBottom: bottom + 80,
	};

	const handleScrollToTop = () => {
		listRef.current?.scrollToOffset({ offset: 0, animated: true });
	};

	if (isLoading && !data) return <ActivityIndicator size='large' />;

	return (
		<LinearGradient
			colors={['white', typeBgColors.normal]}
			start={{ x: 0, y: 0 }}
			end={{ x: 2.5, y: 1 }}
			className='flex-1 bg-white'
			style={{ flex: 1 }}
		>
			<FlashList
				ref={listRef}
				data={displayedPokemonList}
				renderItem={handleRenderItem}
				onEndReachedThreshold={1}
				contentContainerStyle={contentContainerStyle}
				style={{ flex: 1 }}
				alwaysBounceVertical
				refreshing={isRefetching}
				onRefresh={handleRefresh}
				progressViewOffset={top}
				onScroll={({ nativeEvent }) => {
					const isAtTop = nativeEvent.contentOffset.y <= 20;
					setShowScrollToTopButton(!isAtTop);
				}}
				scrollEventThrottle={16}
				onEndReached={() => {
					if (isSavedMode) return;
					if (hasNextPage && !isFetchingNextPage) fetchNextPage();
				}}
				keyExtractor={({ name }) => name}
				ListEmptyComponent={
					isSavedMode ? (
						<View className='mt-16 items-center justify-center px-10'>
							<Text
								className='text-center text-base'
								style={{
									fontFamily: PRIMARY_FONT,
									color: textColor.grey,
								}}
							>
								No saved Pokemon yet. Tap the Pokeball icon on any card to save
								it.
							</Text>
						</View>
					) : null
				}
				ListFooterComponent={
					isFetchingNextPage && !isSavedMode ? <ActivityIndicator /> : null
				}
			/>

			<ScrollToTop
				visible={showScrollToTopButton}
				onPress={handleScrollToTop}
				bottomInset={bottom}
			/>
		</LinearGradient>
	);
};

export default Pokedex;
