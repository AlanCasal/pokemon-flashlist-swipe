import { useState, useCallback, ReactNode } from 'react';

type ShowToastProps = {
	text: string | ReactNode;
	icon?: ReactNode;
	backgroundColor?: string;
	isPokeballColored?: boolean;
};

type ToastConfig = ShowToastProps;

const INITIAL_TOAST_CONFIG: ToastConfig = {
	text: '',
	icon: undefined,
	backgroundColor: undefined,
	isPokeballColored: false,
};

const useToastContextValue = () => {
	const [toastConfig, setToastConfig] =
		useState<ToastConfig>(INITIAL_TOAST_CONFIG);

	const showToast = useCallback(
		({ text, icon, backgroundColor, isPokeballColored }: ShowToastProps) => {
			setToastConfig({
				text,
				icon,
				backgroundColor,
				isPokeballColored,
			});
		},
		[]
	);

	return { showToast, toastConfig };
};

export default useToastContextValue;
