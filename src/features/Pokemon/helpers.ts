import { typeColors } from '@constants/colors';

const POKEMON_NUMBER_PAD_LENGTH = 3;

interface SelectedPokemonNameArgs {
	pokemonDetailsName?: string;
	routePokemonId: string;
}

interface NextSelectedPokemonParamArgs {
	pokemonName: string;
	selectedPokemonName: string | null;
}

interface HandleEvolutionPokemonPressArgs extends NextSelectedPokemonParamArgs {
	setParams: (params: { id: string }) => void;
}

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

export const getSelectedPokemonName = ({
	pokemonDetailsName,
	routePokemonId,
}: SelectedPokemonNameArgs): string | null => {
	if (pokemonDetailsName) return pokemonDetailsName.toLowerCase();

	const normalizedRoutePokemonId = routePokemonId.trim().toLowerCase();
	if (!normalizedRoutePokemonId) return null;

	return Number.isNaN(Number(normalizedRoutePokemonId)) ? normalizedRoutePokemonId : null;
};

export const getNextSelectedPokemonParam = ({
	pokemonName,
	selectedPokemonName,
}: NextSelectedPokemonParamArgs): string | null => {
	const normalizedPokemonName = pokemonName.trim().toLowerCase();
	if (!normalizedPokemonName) return null;
	if (normalizedPokemonName === selectedPokemonName) return null;
	return normalizedPokemonName;
};

export const handleEvolutionPokemonPress = ({
	pokemonName,
	selectedPokemonName,
	setParams,
}: HandleEvolutionPokemonPressArgs) => {
	const nextSelectedPokemonParam = getNextSelectedPokemonParam({
		pokemonName,
		selectedPokemonName,
	});

	if (!nextSelectedPokemonParam) return;

	setParams({ id: nextSelectedPokemonParam });
};
