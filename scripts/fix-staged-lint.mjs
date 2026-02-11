#!/usr/bin/env node

import { execFileSync } from 'node:child_process';

const projectRoot = process.cwd();

function run(command, args) {
	execFileSync(command, args, { cwd: projectRoot, stdio: 'inherit' });
}

function getStagedFiles() {
	const output = execFileSync(
		'git',
		['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z'],
		{ cwd: projectRoot }
	);

	return output
		.toString('utf8')
		.split('\u0000')
		.filter(Boolean)
		.map(filePath => filePath.trim())
		.filter(Boolean);
}

const ignoredLintFiles = new Set([
	'metro.config.js',
	'babel.config.js',
	'todos.js',
	'uniwind-types.d.ts',
]);
const stagedLintFiles = getStagedFiles().filter(
	filePath => /\.(js|jsx|ts|tsx)$/.test(filePath) && !ignoredLintFiles.has(filePath)
);

if (!stagedLintFiles.length) {
	console.log('No staged JS/TS files found. Skipping autofix.');
	process.exit(0);
}

console.log('Auto-fixing staged JS/TS files (eslint + prettier)...');
run('bunx', ['eslint', '--fix', ...stagedLintFiles]);
run('bunx', ['prettier', '--write', ...stagedLintFiles]);
run('git', ['add', '--', ...stagedLintFiles]);
