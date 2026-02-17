import { PokedexGenerationOption } from '@/src/types';

export interface GenerationBottomSheetProps {
	isOpen: boolean;
	selectedOption: PokedexGenerationOption | null;
	onClose: () => void;
	onOptionPress: (option: PokedexGenerationOption) => void;
}

export interface GenerationOptionItem {
	id: PokedexGenerationOption;
	label: string;
	testID: string;
	generationNumber: number;
	starterIds: [number, number, number];
}

export interface GenerationOptionCardProps {
	option: GenerationOptionItem;
	isSelected: boolean;
	onOptionPress: (option: PokedexGenerationOption) => void;
}
