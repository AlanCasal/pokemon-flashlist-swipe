import { PokemonDetails } from '@/src/types/pokemon';

export interface InfoProps {
	name: string;
	types: PokemonDetails['types'];
	id: number;
	handleToggleSaved: () => void;
	isSaved: boolean;
}
