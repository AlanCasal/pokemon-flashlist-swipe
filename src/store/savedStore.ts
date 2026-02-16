import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';

import { PokemonId } from '@/src/types';

import { mmkvStorage } from './mmkvStorage';

export interface SavedStoreState {
	savedPokemons: PokemonId[];
}

export interface SavedStoreActions {
	toggleSavedPokemon: (pokemonId: PokemonId) => void;
	clearSavedPokemons: () => void;
}

export type SavedStore = SavedStoreState & SavedStoreActions;

const zustandStorage: StateStorage = {
	getItem: key => mmkvStorage.getString(key) ?? null,
	setItem: (key, value) => mmkvStorage.set(key, value),
	removeItem: key => mmkvStorage.remove(key),
};

export const useSavedStore = create<SavedStore>()(
	persist(
		set => ({
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
		}),
		{
			name: 'saved-pokemons',
			storage: createJSONStorage(() => zustandStorage),
			partialize: state => ({
				savedPokemons: state.savedPokemons,
			}),
		},
	),
);

export const useSavedPokemons = () => useSavedStore(state => state.savedPokemons);

export const useIsPokemonSaved = (pokemonId?: PokemonId) =>
	useSavedStore(state => {
		if (!pokemonId) return false;
		return state.savedPokemons.includes(pokemonId);
	});

export const useToggleSavedPokemon = () => useSavedStore(state => state.toggleSavedPokemon);

export const useClearSavedPokemons = () => useSavedStore(state => state.clearSavedPokemons);
