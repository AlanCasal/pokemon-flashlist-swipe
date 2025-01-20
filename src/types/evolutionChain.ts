export interface EvolutionDetail {
	pokemon: string;
	imgUrl: string;
	minLevel: number;
}

export interface EvolutionChain {
	baby_trigger_item: null;
	chain: Chain;
	id: number;
}

interface Chain {
	evolution_details: any[];
	evolves_to: Evolvesto2[];
	is_baby: boolean;
	species: Trigger;
}

interface Evolvesto2 {
	evolution_details: Evolutiondetail[];
	evolves_to: Evolvesto[];
	is_baby: boolean;
	species: Trigger;
}

interface Evolvesto {
	evolution_details: Evolutiondetail[];
	evolves_to: any[];
	is_baby: boolean;
	species: Trigger;
}

interface Evolutiondetail {
	gender: null;
	held_item: null;
	item: null;
	known_move: null;
	known_move_type: null;
	location: null;
	min_affection: null;
	min_beauty: null;
	min_happiness: null;
	min_level: number;
	needs_overworld_rain: boolean;
	party_species: null;
	party_type: null;
	relative_physical_stats: null;
	time_of_day: string;
	trade_species: null;
	trigger: Trigger;
	turn_upside_down: boolean;
}

interface Trigger {
	name: string;
	url: string;
}
