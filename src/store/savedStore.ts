import { create } from 'zustand';

type PokemonId = string;

export interface SavedStoreState {
	savedPokemons: PokemonId[];
}

export interface SavedStoreActions {
	toggleSavedPokemon: (pokemonId: PokemonId) => void;
	clearSavedPokemons: () => void;
}

export type SavedStore = SavedStoreState & SavedStoreActions;

export const useSavedStore = create<SavedStore>(set => ({
	savedPokemons: [],

	toggleSavedPokemon: (pokemonId: PokemonId) =>
		set(state => ({
			savedPokemons: state.savedPokemons.includes(pokemonId)
				? state.savedPokemons.filter(id => id !== pokemonId)
				: [...state.savedPokemons, pokemonId],
		})),

	clearSavedPokemons: () =>
		set({
			savedPokemons: [],
		}),
}));

export const useSavedPokemons = () =>
	useSavedStore(state => state.savedPokemons);

export const useToggleSavedPokemon = () =>
	useSavedStore(state => state.toggleSavedPokemon);

export const useClearSavedPokemons = () =>
	useSavedStore(state => state.clearSavedPokemons);
