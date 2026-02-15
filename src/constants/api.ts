export const TOTAL_POKEMON_COUNT = 1025;

export const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

export const API_URL = `${POKE_API_BASE_URL}/pokemon`;

export const POKEMON_SPECIES_URL = `${POKE_API_BASE_URL}/pokemon-species`;

export const SPRITE_URL = (id: number) =>
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const SEARCH_DEBOUNCE_MS = 300;
export const HTTP_NOT_FOUND_STATUS = 404;
