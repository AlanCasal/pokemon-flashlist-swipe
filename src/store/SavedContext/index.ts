import { createContext } from 'react';
import SavedContextValue from './SavedContextValue';

export type SavedContextData = ReturnType<typeof SavedContextValue>;

const SavedContext = createContext<SavedContextData | undefined>(undefined);

export default SavedContext;
