import { createContext } from 'react';
import ToastContextValue from './ToastContextValue';

export type ToastContextData = ReturnType<typeof ToastContextValue>;

const ToastContext = createContext<ToastContextData | undefined>(undefined);

export default ToastContext;
