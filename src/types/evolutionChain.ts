export interface EvolutionChain {
	baby_trigger_item: null;
	chain: Chain;
	id: number;
}

export interface Chain {
	evolution_details: Evolutiondetail[];
	evolves_to: Chain[];
	is_baby: boolean;
	species: Species;
}

export interface Evolutiondetail {
	gender: null;
	held_item: null;
	item: Item;
	known_move: null;
	known_move_type: null;
	location: null;
	min_affection: null;
	min_beauty: null;
	min_happiness: null;
	min_level: number | null;
	needs_overworld_rain: boolean;
	party_species: null;
	party_type: null;
	relative_physical_stats: null;
	time_of_day: string | null;
	trade_species: null;
	trigger: Trigger;
	turn_upside_down: boolean;
}

export interface Trigger {
	name: 'use-item' | 'level-up' | 'trade' | 'shed-skin' | 'other';
	url: string;
}

export interface Species {
	name: string;
	url: string;
}

export interface Item {
	name: string;
	url: string;
}

export type CustomEvolutionChain = {
	pokemon: string;
	minLevel: number | null;
	useItem: string | null;
	imgUrl?: string;
	evolvesTo: CustomEvolutionChain[];
};
