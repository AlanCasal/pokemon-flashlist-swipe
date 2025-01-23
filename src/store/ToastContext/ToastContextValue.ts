import { useState, useCallback, ReactNode } from 'react';

type ShowToastProps = {
	text: string | ReactNode;
	icon?: ReactNode;
	backgroundColor?: string;
	isPokeballColored?: boolean;
};

type ToastConfig = ShowToastProps & { isVisible: boolean };

const INITIAL_TOAST_CONFIG: ToastConfig = {
	isVisible: false,
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
				isVisible: true,
				text,
				icon,
				backgroundColor,
				isPokeballColored,
			});
		},
		[]
	);

	const hideToast = useCallback(() => {
		setToastConfig(prev => ({ ...prev, isVisible: false }));
	}, []);

	return { showToast, hideToast, toastConfig };
};

export default useToastContextValue;
