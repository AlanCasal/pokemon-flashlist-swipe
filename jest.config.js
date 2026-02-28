module.exports = {
	preset: 'jest-expo',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	modulePathIgnorePatterns: ['<rootDir>/.worktrees/'],
	testPathIgnorePatterns: ['<rootDir>/.worktrees/'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'^@features/(.*)$': '<rootDir>/src/features/$1',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@constants/(.*)$': '<rootDir>/src/constants/$1',
		'^@store/(.*)$': '<rootDir>/src/store/$1',
		'^@assets/(.*)$': '<rootDir>/assets/$1',
		'\\.(svg)$': '<rootDir>/src/test/mocks/svgMock.tsx',
	},
};
