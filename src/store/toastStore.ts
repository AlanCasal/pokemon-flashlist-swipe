import { create } from 'zustand';
import { ReactNode } from 'react';

export interface ShowToastParams {
	text: string | ReactNode;
	icon?: ReactNode;
	backgroundColor?: string;
	isPokeballColored?: boolean;
}

export type ToastConfig = ShowToastParams;

export interface ToastStoreState {
	toastConfig: ToastConfig;
}

export interface ToastStoreActions {
	showToast: (params: ShowToastParams) => void;
}

export type ToastStore = ToastStoreState & ToastStoreActions;

const INITIAL_TOAST_CONFIG: ToastConfig = {
	text: '',
	icon: undefined,
	backgroundColor: undefined,
	isPokeballColored: false,
};

export const useToastStore = create<ToastStore>(set => ({
	toastConfig: INITIAL_TOAST_CONFIG,

	showToast: ({ text, icon, backgroundColor, isPokeballColored }) =>
		set({
			toastConfig: {
				text,
				icon,
				backgroundColor,
				isPokeballColored,
			},
		}),
}));

export const useToastConfig = () => useToastStore(state => state.toastConfig);

export const useShowToast = () => useToastStore(state => state.showToast);
