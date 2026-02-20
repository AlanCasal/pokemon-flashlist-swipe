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
const generatedContent = `${generatedHeader}${sourceContent}`;

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, generatedContent, 'utf8');

console.log(
	`Synced ${path.relative(projectRoot, targetPath)} from ${path.relative(projectRoot, sourcePath)}.`,
);
