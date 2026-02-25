import type { PokemonType } from '@constants/index';

import { backgroundColors } from '@/src/constants/colors';
import { PokemonIconType, typeIcons } from '@/src/utils/icons';

type PokemonTypeIconProps = {
	fill?: string;
	size?: number;
	type: PokemonType;
};

const PokemonTypeIcon = ({
	type,
	fill = backgroundColors.light,
	size = 10,
}: PokemonTypeIconProps) => {
	const Icon = typeIcons[type.toLowerCase() as PokemonIconType] ?? null;

	if (!Icon) return null;

	return (
		<Icon
			fill={fill}
			width={size}
			height={size}
		/>
	);
};

export default PokemonTypeIcon;
