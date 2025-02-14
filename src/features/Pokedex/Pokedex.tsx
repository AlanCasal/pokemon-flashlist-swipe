import { ActivityIndicator, Alert, StyleProp, ViewStyle } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import styles from './styles';
import { Pokemon } from '@/src/types/pokemonList';
import PokeCard from '@/src/components/PokeCard';
import { POKE_CARD_HEIGHT } from '@/src/constants/sharedStyles';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { typeBgColors } from '@/src/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { usePokemonList } from '@/src/hooks/usePokemonList';

const Pokedex = () => {
	const { top, bottom } = useSafeAreaInsets();

	const {
		data,
		fetchNextPage,
		isLoading,
		isFetchingNextPage,
		isError,
		error,
		isRefetching,
		refetch,
	} = usePokemonList();

	const handleRefresh = () => refetch();

	const handleRenderItem = useCallback(({ item }: { item: Pokemon }) => {
		return <PokeCard url={item.url} />;
	}, []);

	useEffect(() => {
		if (isError) {
			Alert.alert('Error fetching Pokemon:', error.message);
		}
	}, [isError, error]);

	if (isLoading && !isRefetching && !data)
		return <ActivityIndicator size='large' />;

	const pokemonList = data?.pages.flatMap(page => page.results) ?? [];

	const contentContainerStyle: StyleProp<ViewStyle> = {
		...styles.contentContainer,
		paddingTop: top,
		paddingBottom: bottom,
	};

	return (
		<LinearGradient
			colors={['white', typeBgColors.normal]}
			start={{ x: 0, y: 0 }}
			end={{ x: 2.5, y: 1 }}
			style={styles.container}
		>
			<FlashList
				data={pokemonList}
				renderItem={handleRenderItem}
				estimatedItemSize={POKE_CARD_HEIGHT}
				onEndReachedThreshold={1}
				contentContainerStyle={contentContainerStyle}
				refreshing={isRefetching}
				onRefresh={handleRefresh}
				onEndReached={() => {
					if (!isFetchingNextPage) fetchNextPage();
				}}
				keyExtractor={({ name }, index) => name + index.toString()}
				ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
			/>
		</LinearGradient>
	);
};

export default Pokedex;
