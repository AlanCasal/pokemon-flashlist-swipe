export const TOTAL_POKEMON_COUNT = 1025;

export const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const SPRITE_URL = (id: number) =>
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
