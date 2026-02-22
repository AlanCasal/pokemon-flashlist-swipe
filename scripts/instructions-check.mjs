#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const workspaceSourcePath = path.join(projectRoot, 'WORKSPACE_INSTRUCTIONS.md');
const projectSourcePath = path.join(projectRoot, 'AGENTS.md');
const targetPath = path.join(projectRoot, '.github', 'copilot-instructions.md');

const generatedHeader =
	'<!-- This file is auto-generated from WORKSPACE_INSTRUCTIONS.md and AGENTS.md. Do not edit directly. Run: bun run instructions:sync -->\n\n';

function readFile(filePath) {
	return fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
}

function buildGeneratedContent(workspaceSource, projectSource) {
	const workspaceContent = readFile(workspaceSource).trim();
	const projectContent = readFile(projectSource).trim();

	return `${generatedHeader}<!-- BEGIN WORKSPACE_INSTRUCTIONS.md -->\n${workspaceContent}\n<!-- END WORKSPACE_INSTRUCTIONS.md -->\n\n<!-- BEGIN AGENTS.md -->\n${projectContent}\n<!-- END AGENTS.md -->\n`;
}

const expected = buildGeneratedContent(workspaceSourcePath, projectSourcePath);
const actual = fs.existsSync(targetPath) ? readFile(targetPath) : '';

if (actual !== expected) {
	console.error('Instruction files are out of sync.');
	console.error('Run: bun run instructions:sync');
	process.exit(1);
}

console.log('Instruction files are in sync.');
