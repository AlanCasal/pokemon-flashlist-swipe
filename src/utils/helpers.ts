import { Platform } from 'react-native';

export const chunkArray = <T>(array: T[], size: number) => {
	const chunkArr = [];
	let index = 0;

	while (index < array.length) {
		chunkArr.push(array.slice(index, index + size));
		index += size;
	}

	return chunkArr;
};

export const toTransparent = (hexColor: string) => {
	const sanitized = hexColor.replace('#', '');
	if (sanitized.length !== 6) return 'rgba(0, 0, 0, 0)';
	const r = Number.parseInt(sanitized.slice(0, 2), 16);
	const g = Number.parseInt(sanitized.slice(2, 4), 16);
	const b = Number.parseInt(sanitized.slice(4, 6), 16);
	return `rgba(${r}, ${g}, ${b}, 0)`;
};

type TryCatchSuccess<T> = { success: true; data: T };
type TryCatchError = { success: false; error: unknown };
type TryCatchResult<T> = TryCatchSuccess<T> | TryCatchError;

/**
 * A utility function to handle asynchronous operations with try-catch.
 * It returns an object indicating success or failure, along with the data or error.
 *
 * @param operation - A function that returns a Promise of type T.
 * @returns A Promise that resolves to a TryCatchResult containing either the data or the error.
 * USAGE:

const result = await tryCatch(async () => {
	return promise
});

if(result.success) {
	handle success
} else {
	if(result.error instanceof MyError) {
		handle MyError
	} else {
		handle other errors
	}
}
*/

export const tryCatch = async <T>(operation: () => Promise<T>): Promise<TryCatchResult<T>> => {
	try {
		const data = await operation();
		return { success: true, data };
	} catch (error) {
		return { success: false, error };
	}
};

export const fetchJson = async <T>(url: string): Promise<T> => {
	const response = await fetch(url);

	if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

	return response.json() as Promise<T>;
};

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';
