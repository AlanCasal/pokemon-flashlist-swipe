import { useContext } from 'react';
import ToastContext, { ToastContextData } from './index';

export const useToastContext = (): ToastContextData => {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error('useToastContext must be used within a ToastProvider');
	}

	return context;
};

export default useToastContext;
