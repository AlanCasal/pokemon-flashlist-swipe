import React from 'react';
import { PokemonType } from '@/src/types/pokemonTypes';
import { PokemonIconType, typeIcons } from '@/src/utils/icons';

const PokemonTypeIcon = ({ type }: { type: PokemonType }) => {
	const Icon = typeIcons[type.toLowerCase() as PokemonIconType] ?? null;

	if (!Icon) return null;

	return (
		<Icon
			fill='white'
			width={10}
			height={10}
		/>
	);
};

export default PokemonTypeIcon;
