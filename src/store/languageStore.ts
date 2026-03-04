import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';

import {
	getResolvedLanguage,
	type LanguagePreference,
	type SupportedLanguage,
} from '@/src/i18n/language';

import { mmkvStorage } from './mmkvStorage';

const zustandStorage: StateStorage = {
	getItem: key => mmkvStorage.getString(key) ?? null,
	setItem: (key, value) => mmkvStorage.set(key, value),
	removeItem: key => mmkvStorage.remove(key),
};

export interface LanguageStoreState {
	languagePreference: LanguagePreference;
}

export interface LanguageStoreActions {
	setLanguagePreference: (languagePreference: LanguagePreference) => void;
}

export type LanguageStore = LanguageStoreState & LanguageStoreActions;

export const useLanguageStore = create<LanguageStore>()(
	persist(
		set => ({
			languagePreference: 'system',
			setLanguagePreference: languagePreference =>
				set({
					languagePreference,
				}),
		}),
		{
			name: 'language-preference',
			storage: createJSONStorage(() => zustandStorage),
			partialize: state => ({
				languagePreference: state.languagePreference,
			}),
		},
	),
);

export const useLanguagePreference = () => useLanguageStore(state => state.languagePreference);

export const useSetLanguagePreference = () =>
	useLanguageStore(state => state.setLanguagePreference);

export const useResolvedLanguage = (): SupportedLanguage =>
	useLanguageStore(state => getResolvedLanguage(state.languagePreference));
