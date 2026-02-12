import { createMMKV } from 'react-native-mmkv';

export const mmkvStorage = createMMKV({
	id: 'pokemon-flashlist-swipe-storage',
});
