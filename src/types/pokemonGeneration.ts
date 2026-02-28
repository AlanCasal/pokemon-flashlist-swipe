export interface PokemonGenerationSpecies {
	name: string;
	url: string;
}

export interface PokemonGenerationResponse {
	id: number;
	name: string;
	pokemon_species: PokemonGenerationSpecies[];
}
