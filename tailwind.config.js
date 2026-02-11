/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/app/**/*.{js,jsx,ts,tsx}',
		'./src/components/**/*.{js,jsx,ts,tsx}',
		'./src/features/**/*.{js,jsx,ts,tsx}',
		'./src/hooks/**/*.{js,jsx,ts,tsx}',
		'./src/store/**/*.{js,jsx,ts,tsx}',
		'./src/utils/**/*.{js,jsx,ts,tsx}',
		'./src/constants/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
