import { typeColors } from '@constants/colors';

const POKEMON_NUMBER_PAD_LENGTH = 3;

export const getRouteParamValue = (value: string | string[] | undefined) => {
	if (typeof value === 'string') return value.trim();
	if (Array.isArray(value)) return value[0]?.trim() ?? '';
	return '';
};

export const getPrimaryTypeFromParam = (value: string | string[] | undefined) => {
	const parsedType = getRouteParamValue(value).toLowerCase();

	if (parsedType in typeColors) {
		return parsedType as keyof typeof typeColors;
	}

	return 'dark';
};

export const formatPokemonNumber = (pokemonId: number | undefined) => {
	if (!pokemonId || Number.isNaN(pokemonId)) return '--';
	return `#${pokemonId.toString().padStart(POKEMON_NUMBER_PAD_LENGTH, '0')}`;
};

export const formatPokemonName = (name: string | undefined) => {
	if (!name) return 'Pokemon';
	return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
};
