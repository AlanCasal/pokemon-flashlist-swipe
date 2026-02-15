import { PokedexSortOption } from '@/src/types';

export interface SortBottomSheetProps {
	isOpen: boolean;
	selectedOption: PokedexSortOption | null;
	onClose: () => void;
	onOptionPress: (option: PokedexSortOption) => void;
}
