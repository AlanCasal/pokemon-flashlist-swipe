#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const sourcePath = path.join(projectRoot, 'AGENTS.md');
const targetPath = path.join(projectRoot, '.github', 'instructions', 'copilot-instructions.md');

const generatedHeader =
	'<!-- This file is auto-generated from AGENTS.md. Do not edit directly. Run: bun run instructions:sync -->\n\n';

function readFile(filePath) {
	return fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
}

const sourceContent = readFile(sourcePath);
const expected = `${generatedHeader}${sourceContent}`;
const actual = fs.existsSync(targetPath) ? readFile(targetPath) : '';

if (actual !== expected) {
	console.error('Instruction files are out of sync.');
	console.error('Run: bun run instructions:sync');
	process.exit(1);
}

console.log('Instruction files are in sync.');
