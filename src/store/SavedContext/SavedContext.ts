import { useContext } from 'react';
import SavedContext, { SavedContextData } from './index';

const useSavedContext = (): SavedContextData => {
	const value = useContext(SavedContext);

	if (!value) {
		throw new Error(
			'useSavedContext must be used within an SavedContextProvider'
		);
	}

	return value;
};

export default useSavedContext;
