export interface PokemonImageProps {
	imgUrl: string;
	pokemon: string;
	delay: number;
	size?: number;
	fontSize?: number;
	trigger?: string | null | undefined;
	pokeballFillColor?: string;
	pokeballStrokeColor?: string;
	pokeballOpacity?: number;
}
