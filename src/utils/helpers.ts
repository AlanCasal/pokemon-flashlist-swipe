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
