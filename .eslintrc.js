module.exports = {
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			node: {
				extensions: [
					'.js',
					'.ios.js',
					'.android.js',
					'.ts',
					'.ios.ts',
					'.android.ts',
					'.tsx',
					'.ios.tsx',
					'.android.tsx',
					'.json',
					'.native.js',
				],
			},
			typescript: {
				project: './tsconfig.json',
			},
		},
		jest: {
			version: 29,
		},
	},
	env: {
		browser: true,
		'jest/globals': true,
		'react-native/react-native': true,
	},
	parserOptions: {
		jsx: true,
		useJSXTextNode: true,
		project: './tsconfig.json',
	},
	extends: [
		'airbnb-typescript',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:jest/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:react-native/all',
		'plugin:prettier/recommended',
	],
	plugins: ['jest', 'react', 'react-native', 'react-hooks', 'simple-import-sort'],
	overrides: [
		{
			files: ['src/*/state//reducer/'],
			rules: {
				'no-param-reassign': ['error', { props: false }], // avoid state param assignment
			},
		},
		{
			files: ['src/components/app/dev-menu/**'],
			rules: {
				// 'i18next/no-literal-string': 0, // allow literal strings in dev-menu
			},
		},
		// @TODO: BNA-[34](xxx) - Needs to be aline with the below
		// https://callstack.github.io/react-native-testing-library/docs/start/quick-start#eslint-plugin
		// {
		//   files: ['*/_tests_//.[jt]s?(x)', '*/?(.)+(spec|test).[jt]s?(x)'],
		//   extends: ['plugin:testing-library/react'],
		// },
		//     cutoffDate: '2025-04-22T15:37:00' // Include time in the cutoff
		//   }]
		// }
		// }
	],
	rules: {
		'no-console': ['error'],
		'sort-keys': 0,
		'global-require': 0,
		curly: ['error', 'multi-line'],
		'import/prefer-default-export': 0,
		'import/no-cycle': 0,
		'import/namespace': 0,
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'i18next/no-literal-string': 0,
		'react-hooks/exhaustive-deps': 2,
		'react-native/no-raw-text': 2,
		'react-native/no-inline-styles': 0,
		'react-native/no-color-literals': 0,
		'react/no-unused-prop-types': 0, // existing issue with stateless functions
		'react/require-default-props': 0,
		'react/jsx-props-no-spreading': 0,
		'react/jsx-no-bind': 0,
		'react/jsx-no-literals': [
			'error',
			{
				noStrings: true,
				ignoreProps: true,
				allowedStrings: [],
			},
		],
		'react/prop-types': 0,
		'react/react-in-jsx-scope': 0,
		'react/jsx-no-leaked-render': 0,
		'jest/no-conditional-expect': 0,
		'jest/valid-title': 0,
		'@typescript-eslint/unbound-method': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-unsafe-argument': 0,
		'@typescript-eslint/no-unsafe-member-access': 0,
		'@typescript-eslint/no-unsafe-return': 0,
		'@typescript-eslint/no-unsafe-assignment': 0,
		'@typescript-eslint/no-unsafe-call': 0,
		'@typescript-eslint/ban-ts-comment': 0,
		'@typescript-eslint/restrict-template-expressions': 0,
		'@typescript-eslint/no-floating-promises': 0,
		'@typescript-eslint/no-unsafe-enum-comparison': 0,
		'@typescript-eslint/no-redundant-type-constituents': 0,
		'@typescript-eslint/no-misused-promises': 0,
		'no-restricted-imports': [
			'error',
			{
				paths: [
					{
						name: '@react-native-async-storage/async-storage',
						message:
							'Dont use this module. Please use the generalStorage, or create one exteding from storage/storage.ts',
					},
					{
						name: 'react-native-markdown-display',
						importNames: ['styles'],
						message:
							'Styles should be written by us, this is a typescript declaration library issue. \n\nFor example: import { styles } from "./styles"',
					},
					{
						name: 'react-native-safe-area-context',
						importNames: ['SafeAreaView'],
						message:
							'The react-native-safe-area-context library also exports a SafeAreaView component. \n\n While it works on Android, it also has the same issues with jumpy behavior on vertical animations.',
						// https://reactnavigation.org/docs/handling-safe-area/
					},
				],
			},
		],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: [
					'**/metro.config.js',
					'**/metro.config.ts',
					'*/scripts/*',
					'*/.config.js',
					'*/.config.ts',
					'*/.test.{js,jsx,ts,tsx}',
					'*/_tests_/*',
					'*/_mocks_/*',
					'*/.spec.{js,jsx,ts,tsx}',
					'jest.setup.ts',
				],
			},
		],
	},
	ignorePatterns: [
		'node_modules',
		'_mocks_',
		'android',
		'ios',
		'fastlane',
		'resources',
		'scripts',
		'tmp',
		'src/generated/**',
		'src/generated/schemaTypes.ts',
		'.eslintrc.js',
		'babel.config.js',
		'eslint-rules',
	],
};
